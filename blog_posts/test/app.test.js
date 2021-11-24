const path = require("path");
const request = require("supertest");

const app = require(path.resolve(
  `${process.env.SOLUTION_PATH || ""}`,
  "src/app"
));



describe("App", () => {


  describe("returns 400 for wrong queries", () => {
    test("missing tags parameter", async () => {
        const response = await request(app)
          .get(`/api/posts`)
          .set("Accept", "application/json");
  
        expect(response.status).toBe(400);
        expect(response.body.error).toContain("tags parameter is required");
    });
    test("direction parameter is invalid", async () => {
        const response = await request(app)
          .get(`/api/posts?tags=history,tech&direction=as`)
          .set("Accept", "application/json");
  
        expect(response.status).toBe(400);
        expect(response.body.error).toContain("direction parameter is invalid");
    });
    test("sortBy parameter is invalid", async () => {
        const response = await request(app)
          .get(`/api/posts?tags=history,tech&sortBy=like`)
          .set("Accept", "application/json");
  
        expect(response.status).toBe(400);
        expect(response.body.error).toContain("sortBy parameter is invalid");
    });
  });

  describe("path /api/posts", () => {
    test("gets multiple tags, sorts by id and ascending order by default", async () => {
        const expected = [{"author":"Rylee Paul","authorId":9,"id":1,"likes":960,"popularity":0.13,"reads":50361,"tags":["tech","health"]},{"author":"Zackery Turner","authorId":12,"id":2,"likes":469,"popularity":0.68,"reads":90406,"tags":["startups","tech","history"]},{"author":"Trevon Rodriguez","authorId":5,"id":3,"likes":425,"popularity":0.68,"reads":11381,"tags":["startups","health"]},{"author":"Elisha Friedman","authorId":8,"id":4,"likes":728,"popularity":0.88,"reads":19645,"tags":["science","design","tech"]},{"author":"Bryson Bowers","authorId":6,"id":5,"likes":44,"popularity":0.57,"reads":94293,"tags":["startups","health"]},{"author":"Zackery Turner","authorId":12,"id":6,"likes":387,"popularity":0.83,"reads":50062,"tags":["science","startups"]},{"author":"Adalyn Blevins","authorId":11,"id":12,"likes":590,"popularity":0.32,"reads":80351,"tags":["tech"]},{"author":"Elisha Friedman","authorId":8,"id":13,"likes":230,"popularity":0.31,"reads":64058,"tags":["design","tech"]},{"author":"Trevon Rodriguez","authorId":5,"id":14,"likes":311,"popularity":0.67,"reads":25644,"tags":["tech","history"]},{"author":"Lainey Ritter","authorId":1,"id":15,"likes":560,"popularity":0.8,"reads":81549,"tags":["culture","startups","tech"]},{"author":"Jaden Bryant","authorId":3,"id":18,"likes":983,"popularity":0.09,"reads":33952,"tags":["tech","history"]},{"author":"Lainey Ritter","authorId":1,"id":21,"likes":406,"popularity":0.81,"reads":88797,"tags":["science","startups"]},{"author":"Zackery Turner","authorId":12,"id":24,"likes":940,"popularity":0.74,"reads":89299,"tags":["culture","tech","politics"]},{"author":"Elisha Friedman","authorId":8,"id":25,"likes":365,"popularity":0.12,"reads":32949,"tags":["politics","tech"]},{"author":"Zackery Turner","authorId":12,"id":26,"likes":748,"popularity":0.75,"reads":28239,"tags":["tech"]},{"author":"Lainey Ritter","authorId":1,"id":29,"likes":598,"popularity":0.78,"reads":50661,"tags":["startups"]},{"author":"Ahmad Dunn","authorId":7,"id":31,"likes":980,"popularity":0.63,"reads":94798,"tags":["startups"]},{"author":"Kinley Crosby","authorId":10,"id":35,"likes":868,"popularity":0.2,"reads":66926,"tags":["tech"]},{"author":"Adalyn Blevins","authorId":11,"id":37,"likes":107,"popularity":0.55,"reads":35946,"tags":["tech","health","history"]},{"author":"Jon Abbott","authorId":4,"id":43,"likes":149,"popularity":0.07,"reads":77776,"tags":["science","tech"]},{"author":"Jon Abbott","authorId":4,"id":46,"likes":89,"popularity":0.96,"reads":79298,"tags":["culture","tech"]},{"author":"Bryson Bowers","authorId":6,"id":49,"likes":437,"popularity":0.95,"reads":79986,"tags":["startups"]},{"author":"Jaden Bryant","authorId":3,"id":51,"likes":487,"popularity":0.01,"reads":98798,"tags":["design","startups","tech"]},{"author":"Bryson Bowers","authorId":6,"id":54,"likes":723,"popularity":0.56,"reads":312,"tags":["culture","tech"]},{"author":"Lainey Ritter","authorId":1,"id":55,"likes":554,"popularity":0.05,"reads":42654,"tags":["startups"]},{"author":"Trevon Rodriguez","authorId":5,"id":58,"likes":466,"popularity":0.1,"reads":17389,"tags":["science","tech"]},{"author":"Tia Roberson","authorId":2,"id":59,"likes":971,"popularity":0.21,"reads":36154,"tags":["politics","tech"]},{"author":"Ahmad Dunn","authorId":7,"id":61,"likes":108,"popularity":0.51,"reads":5103,"tags":["startups","health"]},{"author":"Ahmad Dunn","authorId":7,"id":68,"likes":11,"popularity":0.23,"reads":80121,"tags":["startups"]},{"author":"Kinley Crosby","authorId":10,"id":70,"likes":632,"popularity":0.6,"reads":15459,"tags":["startups","health"]},{"author":"Rylee Paul","authorId":9,"id":72,"likes":490,"popularity":0.86,"reads":31099,"tags":["startups"]},{"author":"Lainey Ritter","authorId":1,"id":76,"likes":122,"popularity":0.01,"reads":75771,"tags":["tech","health","politics"]},{"author":"Trevon Rodriguez","authorId":5,"id":77,"likes":407,"popularity":0.21,"reads":664,"tags":["politics","startups","tech","science"]},{"author":"Kinley Crosby","authorId":10,"id":79,"likes":617,"popularity":0.07,"reads":52494,"tags":["culture","startups","history"]},{"author":"Lainey Ritter","authorId":1,"id":82,"likes":140,"popularity":0.09,"reads":3201,"tags":["tech"]},{"author":"Rylee Paul","authorId":9,"id":84,"likes":233,"popularity":0.65,"reads":17854,"tags":["politics","tech","history"]},{"author":"Bryson Bowers","authorId":6,"id":85,"likes":25,"popularity":0.18,"reads":16861,"tags":["tech"]},{"author":"Ahmad Dunn","authorId":7,"id":86,"likes":873,"popularity":0.91,"reads":53869,"tags":["startups","history"]},{"author":"Jon Abbott","authorId":4,"id":87,"likes":619,"popularity":0.66,"reads":61622,"tags":["culture","startups","science"]},{"author":"Adalyn Blevins","authorId":11,"id":89,"likes":251,"popularity":0.6,"reads":75503,"tags":["politics","startups","tech","history"]},{"author":"Trevon Rodriguez","authorId":5,"id":93,"likes":881,"popularity":0.41,"reads":73964,"tags":["tech","history"]},{"author":"Jon Abbott","authorId":4,"id":95,"likes":985,"popularity":0.42,"reads":55875,"tags":["politics","tech","health","history"]},{"author":"Tia Roberson","authorId":2,"id":99,"likes":473,"popularity":0.34,"reads":97868,"tags":["culture","startups","tech"]}]
        const response = await request(app)
        .get(`/api/posts?tags=startups,tech`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.posts).toEqual(expected);
    });
    test("sorts by reads in descending order", async () => {
        const expected = [{"author":"Jaden Bryant","authorId":3,"id":51,"likes":487,"popularity":0.01,"reads":98798,"tags":["design","startups","tech"]},{"author":"Tia Roberson","authorId":2,"id":99,"likes":473,"popularity":0.34,"reads":97868,"tags":["culture","startups","tech"]},{"author":"Ahmad Dunn","authorId":7,"id":31,"likes":980,"popularity":0.63,"reads":94798,"tags":["startups"]},{"author":"Bryson Bowers","authorId":6,"id":5,"likes":44,"popularity":0.57,"reads":94293,"tags":["startups","health"]},{"author":"Zackery Turner","authorId":12,"id":2,"likes":469,"popularity":0.68,"reads":90406,"tags":["startups","tech","history"]},{"author":"Lainey Ritter","authorId":1,"id":21,"likes":406,"popularity":0.81,"reads":88797,"tags":["science","startups"]},{"author":"Lainey Ritter","authorId":1,"id":15,"likes":560,"popularity":0.8,"reads":81549,"tags":["culture","startups","tech"]},{"author":"Ahmad Dunn","authorId":7,"id":68,"likes":11,"popularity":0.23,"reads":80121,"tags":["startups"]},{"author":"Bryson Bowers","authorId":6,"id":49,"likes":437,"popularity":0.95,"reads":79986,"tags":["startups"]},{"author":"Adalyn Blevins","authorId":11,"id":89,"likes":251,"popularity":0.6,"reads":75503,"tags":["politics","startups","tech","history"]},{"author":"Jon Abbott","authorId":4,"id":87,"likes":619,"popularity":0.66,"reads":61622,"tags":["culture","startups","science"]},{"author":"Ahmad Dunn","authorId":7,"id":86,"likes":873,"popularity":0.91,"reads":53869,"tags":["startups","history"]},{"author":"Kinley Crosby","authorId":10,"id":79,"likes":617,"popularity":0.07,"reads":52494,"tags":["culture","startups","history"]},{"author":"Lainey Ritter","authorId":1,"id":29,"likes":598,"popularity":0.78,"reads":50661,"tags":["startups"]},{"author":"Zackery Turner","authorId":12,"id":6,"likes":387,"popularity":0.83,"reads":50062,"tags":["science","startups"]},{"author":"Lainey Ritter","authorId":1,"id":55,"likes":554,"popularity":0.05,"reads":42654,"tags":["startups"]},{"author":"Rylee Paul","authorId":9,"id":72,"likes":490,"popularity":0.86,"reads":31099,"tags":["startups"]},{"author":"Kinley Crosby","authorId":10,"id":70,"likes":632,"popularity":0.6,"reads":15459,"tags":["startups","health"]},{"author":"Trevon Rodriguez","authorId":5,"id":3,"likes":425,"popularity":0.68,"reads":11381,"tags":["startups","health"]},{"author":"Ahmad Dunn","authorId":7,"id":61,"likes":108,"popularity":0.51,"reads":5103,"tags":["startups","health"]},{"author":"Trevon Rodriguez","authorId":5,"id":77,"likes":407,"popularity":0.21,"reads":664,"tags":["politics","startups","tech","science"]}]
        const response = await request(app)
        .get(`/api/posts?tags=startups&sortBy=reads&direction=desc`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.posts).toEqual(expected);
    });
    test("sorts by id", async () => {
        const expected = [{"author":"Zackery Turner","authorId":12,"id":2,"likes":469,"popularity":0.68,"reads":90406,"tags":["startups","tech","history"]},{"author":"Trevon Rodriguez","authorId":5,"id":3,"likes":425,"popularity":0.68,"reads":11381,"tags":["startups","health"]},{"author":"Bryson Bowers","authorId":6,"id":5,"likes":44,"popularity":0.57,"reads":94293,"tags":["startups","health"]},{"author":"Zackery Turner","authorId":12,"id":6,"likes":387,"popularity":0.83,"reads":50062,"tags":["science","startups"]},{"author":"Lainey Ritter","authorId":1,"id":15,"likes":560,"popularity":0.8,"reads":81549,"tags":["culture","startups","tech"]},{"author":"Lainey Ritter","authorId":1,"id":21,"likes":406,"popularity":0.81,"reads":88797,"tags":["science","startups"]},{"author":"Lainey Ritter","authorId":1,"id":29,"likes":598,"popularity":0.78,"reads":50661,"tags":["startups"]},{"author":"Ahmad Dunn","authorId":7,"id":31,"likes":980,"popularity":0.63,"reads":94798,"tags":["startups"]},{"author":"Bryson Bowers","authorId":6,"id":49,"likes":437,"popularity":0.95,"reads":79986,"tags":["startups"]},{"author":"Jaden Bryant","authorId":3,"id":51,"likes":487,"popularity":0.01,"reads":98798,"tags":["design","startups","tech"]},{"author":"Lainey Ritter","authorId":1,"id":55,"likes":554,"popularity":0.05,"reads":42654,"tags":["startups"]},{"author":"Ahmad Dunn","authorId":7,"id":61,"likes":108,"popularity":0.51,"reads":5103,"tags":["startups","health"]},{"author":"Ahmad Dunn","authorId":7,"id":68,"likes":11,"popularity":0.23,"reads":80121,"tags":["startups"]},{"author":"Kinley Crosby","authorId":10,"id":70,"likes":632,"popularity":0.6,"reads":15459,"tags":["startups","health"]},{"author":"Rylee Paul","authorId":9,"id":72,"likes":490,"popularity":0.86,"reads":31099,"tags":["startups"]},{"author":"Trevon Rodriguez","authorId":5,"id":77,"likes":407,"popularity":0.21,"reads":664,"tags":["politics","startups","tech","science"]},{"author":"Kinley Crosby","authorId":10,"id":79,"likes":617,"popularity":0.07,"reads":52494,"tags":["culture","startups","history"]},{"author":"Ahmad Dunn","authorId":7,"id":86,"likes":873,"popularity":0.91,"reads":53869,"tags":["startups","history"]},{"author":"Jon Abbott","authorId":4,"id":87,"likes":619,"popularity":0.66,"reads":61622,"tags":["culture","startups","science"]},{"author":"Adalyn Blevins","authorId":11,"id":89,"likes":251,"popularity":0.6,"reads":75503,"tags":["politics","startups","tech","history"]},{"author":"Tia Roberson","authorId":2,"id":99,"likes":473,"popularity":0.34,"reads":97868,"tags":["culture","startups","tech"]}]
        const response = await request(app)
        .get(`/api/posts?tags=startups&sortBy=id`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.posts).toEqual(expected);
    });
    test("sorts by popularity", async () => {
        const expected = [{"author":"Jaden Bryant","authorId":3,"id":51,"likes":487,"popularity":0.01,"reads":98798,"tags":["design","startups","tech"]},{"author":"Lainey Ritter","authorId":1,"id":55,"likes":554,"popularity":0.05,"reads":42654,"tags":["startups"]},{"author":"Kinley Crosby","authorId":10,"id":79,"likes":617,"popularity":0.07,"reads":52494,"tags":["culture","startups","history"]},{"author":"Trevon Rodriguez","authorId":5,"id":77,"likes":407,"popularity":0.21,"reads":664,"tags":["politics","startups","tech","science"]},{"author":"Ahmad Dunn","authorId":7,"id":68,"likes":11,"popularity":0.23,"reads":80121,"tags":["startups"]},{"author":"Tia Roberson","authorId":2,"id":99,"likes":473,"popularity":0.34,"reads":97868,"tags":["culture","startups","tech"]},{"author":"Ahmad Dunn","authorId":7,"id":61,"likes":108,"popularity":0.51,"reads":5103,"tags":["startups","health"]},{"author":"Bryson Bowers","authorId":6,"id":5,"likes":44,"popularity":0.57,"reads":94293,"tags":["startups","health"]},{"author":"Kinley Crosby","authorId":10,"id":70,"likes":632,"popularity":0.6,"reads":15459,"tags":["startups","health"]},{"author":"Adalyn Blevins","authorId":11,"id":89,"likes":251,"popularity":0.6,"reads":75503,"tags":["politics","startups","tech","history"]},{"author":"Ahmad Dunn","authorId":7,"id":31,"likes":980,"popularity":0.63,"reads":94798,"tags":["startups"]},{"author":"Jon Abbott","authorId":4,"id":87,"likes":619,"popularity":0.66,"reads":61622,"tags":["culture","startups","science"]},{"author":"Zackery Turner","authorId":12,"id":2,"likes":469,"popularity":0.68,"reads":90406,"tags":["startups","tech","history"]},{"author":"Trevon Rodriguez","authorId":5,"id":3,"likes":425,"popularity":0.68,"reads":11381,"tags":["startups","health"]},{"author":"Lainey Ritter","authorId":1,"id":29,"likes":598,"popularity":0.78,"reads":50661,"tags":["startups"]},{"author":"Lainey Ritter","authorId":1,"id":15,"likes":560,"popularity":0.8,"reads":81549,"tags":["culture","startups","tech"]},{"author":"Lainey Ritter","authorId":1,"id":21,"likes":406,"popularity":0.81,"reads":88797,"tags":["science","startups"]},{"author":"Zackery Turner","authorId":12,"id":6,"likes":387,"popularity":0.83,"reads":50062,"tags":["science","startups"]},{"author":"Rylee Paul","authorId":9,"id":72,"likes":490,"popularity":0.86,"reads":31099,"tags":["startups"]},{"author":"Ahmad Dunn","authorId":7,"id":86,"likes":873,"popularity":0.91,"reads":53869,"tags":["startups","history"]},{"author":"Bryson Bowers","authorId":6,"id":49,"likes":437,"popularity":0.95,"reads":79986,"tags":["startups"]}]
        const response = await request(app)
        .get(`/api/posts?tags=startups&sortBy=popularity`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.posts).toEqual(expected);
    });
    test("sorts by likes in ascending order", async () => {
        const expected = [{"author":"Ahmad Dunn","authorId":7,"id":68,"likes":11,"popularity":0.23,"reads":80121,"tags":["startups"]},{"author":"Bryson Bowers","authorId":6,"id":5,"likes":44,"popularity":0.57,"reads":94293,"tags":["startups","health"]},{"author":"Ahmad Dunn","authorId":7,"id":61,"likes":108,"popularity":0.51,"reads":5103,"tags":["startups","health"]},{"author":"Adalyn Blevins","authorId":11,"id":89,"likes":251,"popularity":0.6,"reads":75503,"tags":["politics","startups","tech","history"]},{"author":"Zackery Turner","authorId":12,"id":6,"likes":387,"popularity":0.83,"reads":50062,"tags":["science","startups"]},{"author":"Lainey Ritter","authorId":1,"id":21,"likes":406,"popularity":0.81,"reads":88797,"tags":["science","startups"]},{"author":"Trevon Rodriguez","authorId":5,"id":77,"likes":407,"popularity":0.21,"reads":664,"tags":["politics","startups","tech","science"]},{"author":"Trevon Rodriguez","authorId":5,"id":3,"likes":425,"popularity":0.68,"reads":11381,"tags":["startups","health"]},{"author":"Bryson Bowers","authorId":6,"id":49,"likes":437,"popularity":0.95,"reads":79986,"tags":["startups"]},{"author":"Zackery Turner","authorId":12,"id":2,"likes":469,"popularity":0.68,"reads":90406,"tags":["startups","tech","history"]},{"author":"Tia Roberson","authorId":2,"id":99,"likes":473,"popularity":0.34,"reads":97868,"tags":["culture","startups","tech"]},{"author":"Jaden Bryant","authorId":3,"id":51,"likes":487,"popularity":0.01,"reads":98798,"tags":["design","startups","tech"]},{"author":"Rylee Paul","authorId":9,"id":72,"likes":490,"popularity":0.86,"reads":31099,"tags":["startups"]},{"author":"Lainey Ritter","authorId":1,"id":55,"likes":554,"popularity":0.05,"reads":42654,"tags":["startups"]},{"author":"Lainey Ritter","authorId":1,"id":15,"likes":560,"popularity":0.8,"reads":81549,"tags":["culture","startups","tech"]},{"author":"Lainey Ritter","authorId":1,"id":29,"likes":598,"popularity":0.78,"reads":50661,"tags":["startups"]},{"author":"Kinley Crosby","authorId":10,"id":79,"likes":617,"popularity":0.07,"reads":52494,"tags":["culture","startups","history"]},{"author":"Jon Abbott","authorId":4,"id":87,"likes":619,"popularity":0.66,"reads":61622,"tags":["culture","startups","science"]},{"author":"Kinley Crosby","authorId":10,"id":70,"likes":632,"popularity":0.6,"reads":15459,"tags":["startups","health"]},{"author":"Ahmad Dunn","authorId":7,"id":86,"likes":873,"popularity":0.91,"reads":53869,"tags":["startups","history"]},{"author":"Ahmad Dunn","authorId":7,"id":31,"likes":980,"popularity":0.63,"reads":94798,"tags":["startups"]}]
        const response = await request(app)
        .get(`/api/posts?tags=startups&sortBy=likes&direction=asc`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.posts).toEqual(expected);
    });
  });

//   describe("availability path /?from=hh:mm&to=hh:mm", () => {
//     test("get /?from=7:00&to=8:00 returns 5 results", async () => {
//       const expected = [
//         {
//             "clinicName": "Hopkins Hospital Baltimore",
//             "state": "FL",
//             "availability": {
//                 "from": "07:00",
//                 "to": "22:00"
//             }
//         },
//         {
//             "clinicName": "Swedish Medical Center",
//             "state": "AZ",
//             "availability": {
//                 "from": "07:00",
//                 "to": "20:00"
//             }
//         },
//         {
//             "clinicName": "Scratchpay Test Pet Medical Center",
//             "state": "CA",
//             "availability": {
//                 "from": "00:00",
//                 "to": "24:00"
//             }
//         },
//         {
//             "clinicName": "Scratchpay Official practice",
//             "state": "TN",
//             "availability": {
//                 "from": "00:00",
//                 "to": "24:00"
//             }
//         },
//         {
//             "clinicName": "Scratchpay Test Pet Medical Center",
//             "state": "CA",
//             "availability": {
//                 "from": "00:00",
//                 "to": "24:00"
//             }
//         }
//     ]

//       const response = await request(app)
//         .get(`/?from=7:00&to=8:00`)
//         .set("Accept", "application/json");

//       expect(response.status).toBe(200);
//       expect(response.body.data).toEqual(expected);
//     });
    
//   });
//   describe("name search path /?name=clinicName", () => {
//     test("get /?name=Swedish Medical returns 1 results", async () => {
//       const expected = [
//         {
//             "clinicName": "Swedish Medical Center",
//             "state": "AZ",
//             "availability": {
//                 "from": "07:00",
//                 "to": "20:00"
//             }
//         }
//     ]

//       const response = await request(app)
//         .get(`/?name=Swedish Medical`)
//         .set("Accept", "application/json");

//       expect(response.status).toBe(200);
//       expect(response.body.data).toEqual(expected);
//     });
    
//   });
//   describe("state search path /?state=New York", () => {
//     test("get /?state=New York returns 1 results", async () => {
//       const expected = [
//         {
//             "clinicName": "Cleveland Clinic",
//             "state": "NY",
//             "availability": {
//                 "from": "11:00",
//                 "to": "22:00"
//             }
//         }
//     ]

//       const response = await request(app)
//         .get(`/?state=New York`)
//         .set("Accept", "application/json");

//       expect(response.status).toBe(200);
//       expect(response.body.data).toEqual(expected);
//     });
//   });
//   describe("multiply search paramters", () => {
//     test("get /?from=8:00&to=9:00&state=KS returns 1 results", async () => {
//       const expected =  [
//         {
//             "clinicName": "German Pets Clinics",
//             "state": "KS",
//             "availability": {
//                 "from": "08:00",
//                 "to": "20:00"
//             }
//         }
//     ]

//       const response = await request(app)
//         .get(`/?from=8:00&to=9:00&state=KS`)
//         .set("Accept", "application/json");

//       expect(response.status).toBe(200);
//       expect(response.body.data).toEqual(expected);
//     });
//     test("get /?name=Scratchpay&state=California returns 2 results", async () => {
//         const expected =  [
//             {
//                 "clinicName": "Scratchpay Test Pet Medical Center",
//                 "state": "CA",
//                 "availability": {
//                     "from": "00:00",
//                     "to": "24:00"
//                 }
//             },
//             {
//                 "clinicName": "Scratchpay Test Pet Medical Center",
//                 "state": "CA",
//                 "availability": {
//                     "from": "00:00",
//                     "to": "24:00"
//                 }
//             }
//         ]
  
//         const response = await request(app)
//           .get(`/?name=Scratchpay&state=California`)
//           .set("Accept", "application/json");
  
//         expect(response.status).toBe(200);
//         expect(response.body.data).toEqual(expected);
//       });
//   });
});
