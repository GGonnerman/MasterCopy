const fs = require('fs');

let holderObject = {
  "targets": [
    {
      "isStage": true,
      "name": "Stage",
      "variables": {
        "`jEk@4|i[#Fk?(8x)AV.-my variable": [
          "my variable",
          0
        ]
      },
      "lists": {},
      "broadcasts": {},
      "blocks": {},
      "comments": {},
      "currentCostume": 0,
      "costumes": [
        {
          "assetId": "cd21514d0531fdffb22204e0ec5ed84a",
          "name": "backdrop1",
          "md5ext": "cd21514d0531fdffb22204e0ec5ed84a.svg",
          "dataFormat": "svg",
          "rotationCenterX": 240,
          "rotationCenterY": 180
        }
      ],
      "sounds": [
        {
          "assetId": "83a9787d4cb6f3b7632b4ddfebf74367",
          "name": "pop",
          "dataFormat": "wav",
          "format": "",
          "rate": 44100,
          "sampleCount": 1032,
          "md5ext": "83a9787d4cb6f3b7632b4ddfebf74367.wav"
        }
      ],
      "volume": 100,
      "layerOrder": 0,
      "tempo": 60,
      "videoTransparency": 50,
      "videoState": "on",
      "textToSpeechLanguage": null
    },
    {
      "isStage": false,
      "name": "Sprite1",
      "variables": {},
      "lists": {},
      "broadcasts": {},
      "blocks": {},
      "comments": {},
      "currentCostume": 0,
      "costumes": [
        {
          "assetId": "b7853f557e4426412e64bb3da6531a99",
          "name": "costume1",
          "bitmapResolution": 1,
          "md5ext": "b7853f557e4426412e64bb3da6531a99.svg",
          "dataFormat": "svg",
          "rotationCenterX": 48,
          "rotationCenterY": 50
        },
        {
          "assetId": "e6ddc55a6ddd9cc9d84fe0b4c21e016f",
          "name": "costume2",
          "bitmapResolution": 1,
          "md5ext": "e6ddc55a6ddd9cc9d84fe0b4c21e016f.svg",
          "dataFormat": "svg",
          "rotationCenterX": 46,
          "rotationCenterY": 53
        }
      ],
      "sounds": [],
      "volume": 100,
      "layerOrder": 1,
      "visible": true,
      "x": 0,
      "y": 0,
      "size": 100,
      "direction": 90,
      "draggable": false,
      "rotationStyle": "all around"
    }
  ],
  "monitors": [],
  "extensions": [],
  "meta": {
    "semver": "3.0.0",
    "vm": "0.2.0-prerelease.20190822194548",
    "agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"
  }
}

let idList /*linked list?*/ = [];

// "#CeHV_$wWBqa0oAn5}zr": {
//     opcode: "motion_turnright",
//     next: null,
//     parent: "_@ogUZQAIx,Ve`CS#tq,",
//     inputs: {
//       DEGREES: [1, [4, "15"]]
//     },
//     fields: {},
//     shadow: false,
//     topLevel: false
//   }

block_num = 5;

function block_generator(opcode) {
	let block = {
		inputs: {},
		fields: {},
		shadow: false,
		topLevel: true,
	};

	function set(id, val) {
	block[id] = val;
	}


	if(block_num === 0) {
		set("parent", null);
	} else {
		set("parent", set("next", (block_num - 1).toString().padStart(10, '0')))
	}

	block_id = block_num.toString().padStart(10, '0');
	block_num++;
	set("next", block_num.toString().padStart(10, '0'));

	switch (opcode) {
		case "start":
			set("x", 10);
			set("y", 10);
			set("opcode", "event_whenflagclicked");
			break;
		case "end":
			console.log("Bye");
			break;
		default:
			console.log("Lol");
			break;
	}

	// Convert opcode from some easier input method
	// Javascript version of enum?

	// Generate id
	// Check if id in idList
	// If not, set id and add to idList
	// Else, generate new id

	idList.push(block_id);
	holderObject["targets"][0]["blocks"][block_id] = block;
}

block_generator("start");
// block_generator("end");
// block_generator("other");

console.log("\n\n\n")

console.log(holderObject);

fs.writeFile("project.json", JSON.stringify(holderObject), 'utf8', function (err) {
	    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    console.log("JSON file has been saved.");
});

var blocks = {
	"bzrxV3z72!*}n+7:W1Bb": {
//		opcode: "event_whenflagclicked",
//		next: "o^.fB2v8RG/BeiS*yGDE",
//		parent: null,
//		inputs: {},
//		fields: {},
//		shadow: false,
//		topLevel: true,
//		x: 237,
//		y: 87
	},
	"o^.fB2v8RG/BeiS*yGDE": {
		opcode: "motion_movesteps",
		next: "_@ogUZQAIx,Ve`CS#tq,",
		parent: "bzrxV3z72!*}n+7:W1Bb",
		inputs: {
			STEPS: [1, [4, "10"]]
		},
		fields: {},
		shadow: false,
		topLevel: false
	},
	"_@ogUZQAIx,Ve`CS#tq,": {
		opcode: "control_wait",
		next: "#CeHV_$wWBqa0oAn5}zr",
		parent: "o^.fB2v8RG/BeiS*yGDE",
		inputs: {
			DURATION: [1, [5, "5"]]
		},
		fields: {},
		shadow: false,
		topLevel: false
	},
	"#CeHV_$wWBqa0oAn5}zr": {
		opcode: "motion_turnright",
		next: null,
		parent: "_@ogUZQAIx,Ve`CS#tq,",
		inputs: {
			DEGREES: [1, [4, "15"]]
		},
		fields: {},
		shadow: false,
		topLevel: false
	}
};

