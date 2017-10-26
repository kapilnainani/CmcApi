const unirest = require('unirest');
let accessToken = null;

export default {
    getAccessToken: function () {
        return new Promise(function (resolve, reject) {
        unirest.post('https://cmc-api.appirio.net/v_beta/oauth/token')
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
        .send({ 'refreshToken':'5Aep861eWO5D.7wJBu2NtzW7PW9j3lEhak9yQSAz.PvEw6_70xaIWM.menjrwEJrro2OQSluKRJbdLiYARRqVI7' })
        .end(function (response: any) {
            if(response.statusCode ==200){
                accessToken = response.body.accessToken;
                console.log(accessToken);
                 resolve(accessToken);   
            }
            else{
                reject(response)
            }
            
        });
    })
    },

    storyCheck:function (AccessToken:any,StoryNumber:any) {
        return new Promise(function (resolve:any) {
            console.log(encodeURI("query=storyNumber like '%"+StoryNumber + "%'"));
            let Url = "https://cmc-api.appirio.net/v_beta/stories?"+ encodeURI("query=storyNumber like '%"+ StoryNumber + "%'");
            unirest.get(Url)
            .headers({'Accept': 'application/json', 'AuthorizationToken': AccessToken})
            .end(function (response:any) {
                resolve(JSON.stringify(response.body.content.records[0].description));
            });
        })
    },

    fetchProductStories: function (ProductName:any,AccessToken:any) {
        return new Promise(function (resolve, reject) {
            console.log(encodeURI("query=Product__c like '%")+ProductName + "%'");
            let Url = "https://cmc-api.appirio.net/v_beta/stories?query=Product__c%20like%20'%25"+ProductName+"%25'";
            console.log(Url);
            unirest.get(Url)
            .headers({'Accept': 'application/json', 'AuthorizationToken': AccessToken})
            .end(function (response:any) {
                if(response.statusCode==200){
                    resolve(JSON.stringify(response.body.content.records));
                }
             else{
                 reject(response);
             }
            });
        })
    }
}