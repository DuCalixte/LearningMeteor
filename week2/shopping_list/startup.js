if (Meteor.isServer) {
  Meteor.startup(function() {
    if (Images.find().count() == 0) {
      var dir = Meteor.absolutePath + '/public/img/data';
      fs.readdir(dir, Meteor.bindEnvironment(function(err, files) {
        if (err) {
          console.error("Error found: ", err);
          process.exit(1);
        }
        files.sort(function(a, b) {
          return (a.replace(/[^0-9]/g, '') - b.replace(/[^0-9]/g, ''))
        }).forEach(function(file, index) {
          Images.insert({
            img_src: 'img/data/' + file,
            img_alt: "image collection " + (index + 1)
          });
        });
      }));
    }
  });
}
