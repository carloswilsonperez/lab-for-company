import axios from 'axios';
let a = 5;

var token;
var status;
var userData = [];
var n = 0;
// Make a request for a user with a given ID
axios.get('http://13.58.37.162?email=carloswilsonperez@gmail.com')
  .then(function (response) {
    var data = response.data;
    token = data.token;
    getUserObjects();
  })
  .catch(function (error) {
    console.log(error);
  });

  function getUserObjects() {
    axios.get('http://13.58.37.162/data?token=' + token)
    .then(function (response) {
        userData.push(response.data);
        status = response.status;
        if (response.status === 200 && n < 10) {
            getUserObjects();
        }
    })
    .catch(function (error) {
        processResults();
    });
}
 
function processResults() {
    var n = userData.length;
    var arrayLongs = [];
    var i = 0;
    while (i < n) {
        var partial = [];
        partial.push(i);
        while (i < (n-1) && userData[i+1].age > userData[i].age) {
            partial.push(i+1);
            i++;
        }
        arrayLongs.push(partial);
        i++;
    }
    getLargerIncreasingSubset(arrayLongs);
}

function getLargerIncreasingSubset(data) {
    var maxLong = 0;
    var maxArr;
    for (var i = 0; i < data.length; i++) {
        if (data[i].length > maxLong) {
            maxLong = data[i].length;
            maxArr = data[i];
        }
    }
    var avgAge = getAverage(maxArr);
    var sortedNames = sortNames(getNames(maxArr));
    var payload = getPayload(sortedNames);
    var jsonPayload = {
        "age": avgAge,
        "payload": payload,
        "code": 'Y29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpOw0KDQp2YXIgdG9rZW47DQp2YXIgc3RhdHVzOw0KdmFyIHVzZXJEYXRhID0gW107DQp2YXIgbiA9IDA7DQovLyBNYWtlIGEgcmVxdWVzdCBmb3IgYSB1c2VyIHdpdGggYSBnaXZlbiBJRA0KYXhpb3MuZ2V0KCdodHRwOi8vMTMuNTguMzcuMTYyP2VtYWlsPWNhcmxvc3dpbHNvbnBlcmV6QGdtYWlsLmNvbScpDQogIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgew0KICAgIHZhciBkYXRhID0gcmVzcG9uc2UuZGF0YTsNCiAgICB0b2tlbiA9IGRhdGEudG9rZW47DQogICAgZ2V0VXNlck9iamVjdHMoKTsNCiAgfSkNCiAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikgew0KICAgIGNvbnNvbGUubG9nKGVycm9yKTsNCiAgfSk7DQoNCiAgZnVuY3Rpb24gZ2V0VXNlck9iamVjdHMoKSB7DQogICAgYXhpb3MuZ2V0KCdodHRwOi8vMTMuNTguMzcuMTYyL2RhdGE/dG9rZW49JyArIHRva2VuKQ0KICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgew0KICAgICAgICB1c2VyRGF0YS5wdXNoKHJlc3BvbnNlLmRhdGEpOw0KICAgICAgICBzdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7DQogICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCAmJiBuIDwgMTApIHsNCiAgICAgICAgICAgIGdldFVzZXJPYmplY3RzKCk7DQogICAgICAgIH0NCiAgICB9KQ0KICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHsNCiAgICAgICAgcHJvY2Vzc1Jlc3VsdHMoKTsNCiAgICB9KTsNCn0NCiANCmZ1bmN0aW9uIHByb2Nlc3NSZXN1bHRzKCkgew0KICAgIHZhciBuID0gdXNlckRhdGEubGVuZ3RoOw0KICAgIHZhciBhcnJheUxvbmdzID0gW107DQogICAgdmFyIGkgPSAwOw0KICAgIHdoaWxlIChpIDwgbikgew0KICAgICAgICB2YXIgcGFydGlhbCA9IFtdOw0KICAgICAgICBwYXJ0aWFsLnB1c2goaSk7DQogICAgICAgIHdoaWxlIChpIDwgKG4tMSkgJiYgdXNlckRhdGFbaSsxXS5hZ2UgPiB1c2VyRGF0YVtpXS5hZ2UpIHsNCiAgICAgICAgICAgIHBhcnRpYWwucHVzaChpKzEpOw0KICAgICAgICAgICAgaSsrOw0KICAgICAgICB9DQogICAgICAgIGFycmF5TG9uZ3MucHVzaChwYXJ0aWFsKTsNCiAgICAgICAgaSsrOw0KICAgIH0NCiAgICBnZXRMYXJnZXJJbmNyZWFzaW5nU3Vic2V0KGFycmF5TG9uZ3MpOw0KfQ0KDQpmdW5jdGlvbiBnZXRMYXJnZXJJbmNyZWFzaW5nU3Vic2V0KGRhdGEpIHsNCiAgICB2YXIgbWF4TG9uZyA9IDA7DQogICAgdmFyIG1heEFycjsNCiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHsNCiAgICAgICAgaWYgKGRhdGFbaV0ubGVuZ3RoID4gbWF4TG9uZykgew0KICAgICAgICAgICAgbWF4TG9uZyA9IGRhdGFbaV0ubGVuZ3RoOw0KICAgICAgICAgICAgbWF4QXJyID0gZGF0YVtpXTsNCiAgICAgICAgfQ0KICAgIH0NCiAgICB2YXIgYXZnQWdlID0gZ2V0QXZlcmFnZShtYXhBcnIpOw0KICAgIHZhciBzb3J0ZWROYW1lcyA9IHNvcnROYW1lcyhnZXROYW1lcyhtYXhBcnIpKTsNCiAgICB2YXIgcGF5bG9hZCA9IGdldFBheWxvYWQoc29ydGVkTmFtZXMpOw0KICAgIHZhciBqc29uUGF5bG9hZCA9IHsNCiAgICAgICAgImFnZSI6IGF2Z0FnZSwNCiAgICAgICAgInBheWxvYWQiOiBwYXlsb2FkLA0KICAgICAgICAiY29kZSI6ICIiDQogICAgfQ0KDQogICAgYXhpb3MucG9zdCgnaHR0cDovLzEzLjU4LjM3LjE2Mi9yZXN1bHQ/dG9rZW49JyArIHRva2VuLCBqc29uUGF5bG9hZCkNCiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7DQogICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7DQogICAgICAgIH0pDQogICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHsNCiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTsNCiAgICAgICAgfSk7DQp9DQoNCmZ1bmN0aW9uIGdldEF2ZXJhZ2UobWF4QXJyKSB7DQogICAgdmFyIHN1bSA9IDA7DQogICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXhBcnIubGVuZ3RoOyBpKyspIHsNCiAgICAgICAgc3VtICs9IHVzZXJEYXRhW21heEFycltpXV0uYWdlOw0KICAgIH0NCg0KICAgIHJldHVybiBNYXRoLnRydW5jKHN1bSAvIG1heEFyci5sZW5ndGgpOw0KfQ0KDQpmdW5jdGlvbiBnZXROYW1lcyhtYXhBcnIpIHsNCiAgICB2YXIgbmFtZXMgPSBbXTsNCiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1heEFyci5sZW5ndGg7IGkrKykgew0KICAgICAgICBuYW1lcy5wdXNoKHVzZXJEYXRhW21heEFycltpXV0ubmFtZSk7DQogICAgfQ0KICAgIHJldHVybiBuYW1lczsNCn0NCg0KZnVuY3Rpb24gc29ydE5hbWVzKG5hbWVzKSB7DQogICAgcmV0dXJuIG5hbWVzLnNvcnQoKTsNCn0NCg0KZnVuY3Rpb24gZ2V0UGF5bG9hZChuYW1lcykgew0KICAgIHZhciBwYXlsb2FkID0gJyc7DQogICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykgew0KICAgICAgICB2YXIgc3VybmFtZSA9IG5hbWVzW2ldLnNwbGl0KCcgJylbMV0uY2hhckF0KDApOw0KICAgICAgICBwYXlsb2FkICs9IHN1cm5hbWU7DQogICAgfQ0KICAgIHJldHVybiBwYXlsb2FkOw0KfQ=='
    }

    axios.post('http://13.58.37.162/result?token=' + token, jsonPayload, {headers: {
        'Content-Type': 'application/json'
    }})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getAverage(maxArr) {
    var sum = 0;
    for (var i = 0; i < maxArr.length; i++) {
        sum += userData[maxArr[i]].age;
    }

    return Math.trunc(sum / maxArr.length);
}

function getNames(maxArr) {
    var names = [];
    for (var i = 0; i < maxArr.length; i++) {
        names.push(userData[maxArr[i]].name);
    }
    return names;
}

function sortNames(names) {
    return names.sort();
}

function getPayload(names) {
    var payload = '';
    for (var i = 0; i < names.length; i++) {
        var surname = names[i].split(' ')[1].charAt(0);
        payload += surname;
    }
    return payload;
}