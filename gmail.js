function main() {

  var label = GmailApp.getUserLabelByName("Confirm");
  var threads = label.getThreads();

  threads.forEach(function(thread) {

    var message = thread.getMessages()[0];
    var value = message.getRawContent()
                       .match(/^t: ((.|\r\n\s)+)\r\n/m)[1];

    if (value) {
      var url = value.match(/<(https?:\/\/[^>]+)>/)[1];
      if (url) {
        var status = UrlFetchApp.fetch(url).getResponseCode();
        Logger.log("confirmed " + status + " " + url);
      }
    }

    thread.removeLabel(label);
  });
}
