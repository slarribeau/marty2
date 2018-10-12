import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
    //FilterPipe will filter out records that don't match specified date.
    let pipe = new FilterPipe();
  
  it('Return entire input set when input is only one record and matches specified date', () => {
    let data = [{
        "Date" : "1/1/2018",
        "Name" : "Scott"
    }]
    expect(pipe.transform(data, "1/1/2018")).toEqual(data);
  });
  it('Return entire input set when input is multiple records and all match specified date', () => {
    let data = [
        { "Date" : "1/1/2018","Name" : "Scott"},
        { "Date" : "1/1/2018","Name" : "Paul"}
    ]

    expect(pipe.transform(data, "1/1/2018")).toEqual(data);
  });

  it('Return records in input set that match specified date when input has multiple records', () => {
    let inData = [
        { "Date" : "1/1/2018","Name" : "Scott"},
        { "Date" : "1/2/2018","Name" : "Paul"}
    ]

    let outData = [
        { "Date" : "1/1/2018","Name" : "Scott"}
    ]
    expect(pipe.transform(inData, "1/1/2018")).toEqual(outData);
  });

  it("Return no records from input set when none match specified date when input has single record", () => {
    let data = [{
        "Date" : "1/9/2018",
        "Name" : "Scott"
    }]
    expect(pipe.transform(data, "1/1/2018").length).toEqual(0);
  });

  it("Return no records from input set when none match specified date when input has single record", () => {
    let data = [
        { "Date" : "1/1/2018","Name" : "Scott"},
        { "Date" : "1/2/2018","Name" : "Paul"}
    ]
    expect(pipe.transform(data, "1/11/2018").length).toEqual(0);
  });

  it('return all when filter is null', () => {

    let data = [{
        "Date" : "1/9/2018",
        "Name" : "Scott"
    }]
    expect(pipe.transform(data, null)).toBe(data);
  });

  it('return empty array when there is no data passed into filter', () => {
    expect(pipe.transform(null, "1/9/2018").length).toEqual(0);
  });
});
