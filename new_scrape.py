from bs4 import BeautifulSoup
import requests
import re
import datetime


def get_results(myFilter, league, division, year, month, day) :
   url  = ("http://www.baseball-reference.com/games/standings.cgi?year=%s&month=%s&day=%s&submit=Submit+Date" % (year, month, day))
   r  = requests.get(url);
   data = r.text
   soup = BeautifulSoup(data, "html.parser")

   last_links = soup.find(id='all_standings-upto-AL-overall')
   last_links.decompose()
   last_links = soup.find(id='all_standings-upto-NL-overall')
   last_links.decompose()

   standings_list = soup.find(id=myFilter)


   standings_list_items = standings_list.find_all('tr')
   text = ['"Team":', '"W":', '"L":', '"PCT":', '"GB":', '"Date":', 'G:', 'H:'];

   for standings_tupple in standings_list_items:
      s = '{"League":' + league + ', "Division":' + division + ', ';
      i = 0;
      hyperLinks = standings_tupple.find_all('a')
      if (len(hyperLinks) == 0):
         continue;
      for hyperLink in hyperLinks:
         s = s + text[i] + '"' + hyperLink.contents[0] + '", ';
      i=i+1;
      tableDataCells = standings_tupple.find_all('td')
      for tableDataCell in tableDataCells:
         if (len(tableDataCell.contents)>0) :
            if (i==5):
              s = s + text[i] + '"' + str(year) + '-'+ str(month) +'-' + str(day) + '"},  ';
              break;
            else: 
               s = s + text[i] + '"' + tableDataCell.contents[0] + '",  ';
         else :
            s = s + text[i] + '--'  + ",  ";
         i=i+1;

      print(s); 


delta = datetime.timedelta(days=1)
d = datetime.datetime(2018,3,29)
end_date = datetime.datetime(2018,9,30)
end_date = datetime.datetime.today()
end_date -= delta #set to yesterday's date
while d <= end_date: 
    tmpYear = d.year;
    tmpMonth = d.month;
    tmpDay = d.day;

    if tmpMonth <= 9:
       tmpMonth = "0%d" % (tmpMonth)

    if tmpDay <= 9:
       tmpDay = "0%d" % (tmpDay)

    get_results('all_standings-upto-AL-E', '"AL"', '"EAST"', tmpYear, tmpMonth, tmpDay);
    get_results('all_standings-upto-AL-C', '"AL"', '"CENT"', tmpYear, tmpMonth, tmpDay);
    get_results('all_standings-upto-AL-W', '"AL"', '"WEST"', tmpYear, tmpMonth, tmpDay);
    get_results('all_standings-upto-NL-E', '"NL"', '"EAST"', tmpYear, tmpMonth, tmpDay);
    get_results('all_standings-upto-NL-C', '"NL"', '"CENT"', tmpYear, tmpMonth, tmpDay);
    get_results('all_standings-upto-NL-W', '"NL"', '"WEST"', tmpYear, tmpMonth, tmpDay);
    d += delta

