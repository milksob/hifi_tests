if (typeof user === 'undefined') user = "highfidelity/";
if (typeof repository === 'undefined') repository = "hifi_tests/";
if (typeof branch === 'undefined') branch = "master/";

var autoTester = Script.require("https://github.com/" + user + repository + "blob/" + branch + "tests/utils/autoTester.js?raw=true" );

autoTester.perform("Haze - small glare", Script.resolvePath("."), "secondary", function(testType) {
    // Test material matrix
    Script.include("../setup.js?raw=true")

    var HAZE = {
        hazeRange: 500.0,
        hazeBaseRef: MyAvatar.position.y,
        hazeColor: { red: 153, green: 107, blue: 47 },
        hazeEnableGlare: 1,
        hazeGlareColor: { red: 176, green: 25, blue: 68 },
        hazeGlareAngle: 5
    };

    // Setup
    var createdEntities;
    autoTester.addStep("Setup", function () {
        var offset = { x: 0.0, y: -1.0, z: 0.0 };
        createdEntities = setup(HAZE, Vec3.sum( autoTester.getOriginFrame(), offset);
        validationCamera_translate(offset);
    });

    autoTester.addStepSnapshot("Show haze with small glare angle");

    autoTester.addStep("Clean up after test", function () {
        for (var i = 0; i < createdEntities.length; i++) {
            Entities.deleteEntity(createdEntities[i]);
        }
    });

    var result = autoTester.runTest(testType);
});
