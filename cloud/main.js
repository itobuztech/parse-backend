Parse.Cloud.define("test", async function(request, response) {
  var text = "hello world";
  const query = new Parse.Query("ataata");
  const results = await query.find();
  var jsonObject = {
      "answer": text,
      request: request,
      users: results
  };
  response.success(jsonObject);
});