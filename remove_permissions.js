var permissionsToRemove = ["com.google.android.gms.permission.AD_ID"]; 
var fs = require('fs'); 
var path = require('path');

module.exports = function (context) {
    var projectRoot = context.opts.cordova.project ? context.opts.cordova.project.root : context.opts.projectRoot;
    var manifestPath = path.join(projectRoot, 'platforms/android/app/src/main/AndroidManifest.xml');
    var manifestFile = fs.readFileSync(manifestPath).toString();
    
    fs.readFile( manifestFile, "utf8", function( err, data ){ 
    if (err) 
        return console.log( err ); 

    var result = data; 
    for (var i=0; i<permissionsToRemove.length; i++) 
        result = result.replace( "<uses-permission android:name=\"" + permissionsToRemove[i] + "\" />", "" ); 

    fs.writeFile( manifestFile, result, "utf8", function( err ) 
    { 
        if (err) 
            return console.log( err ); 
    } ); 
    } );

};
