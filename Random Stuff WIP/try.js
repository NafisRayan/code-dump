const WhichX = require('whichx');
let whichx = new WhichX();

// Training data for encouragement and praise
const trainingData = [
  // Encouragement examples
  { label: "encouragement", text: "You built a really tall tower!" },
  { label: "encouragement", text: "You used a lot of blocks for that tall tower!" },
  { label: "encouragement", text: "That’s a lot of balancing you did!" },
  { label: "encouragement", text: "Looks like you work hard on that tower" },
  { label: "encouragement", text: "Building high takes a lot of practice Look what you did!" },
  { label: "encouragement", text: "Building high is tricky You did it!" },
  { label: "encouragement", text: "It is tall You seem proud of all that work!" },
  { label: "encouragement", text: "You’ve really practiced building high Now maybe when someone else is practicing, you can help them!" },
  { label: "encouragement", text: "You tried over and over again and now you can build super high!" },
  { label: "encouragement", text: "Are you so carefully placing the blocks to get them so high?" },
  { label: "encouragement", text: "Building that tower took imagination and skill!" },
  { label: "encouragement", text: "You’re passing/sharing blocks" },
  { label: "encouragement", text: "You’re working together!" },
  { label: "encouragement", text: "Are you doing team work?!" },
  { label: "encouragement", text: "Looks like you’re having fun building together" },
  { label: "encouragement", text: "You’re sharing and building together; is it working well together?" },
  { label: "encouragement", text: "You’re figuring it out together – passing and building – look at how it’s coming along!" },
  { label: "encouragement", text: "Looks like you’ve both having a great time together passing and building blocks!!!" },
  { label: "encouragement", text: "You shared the blocks." },
  { label: "encouragement", text: "Look, X, Z brought you a tissue thinking it would help you feel better, that was kind of him, right?" },
  { label: "encouragement", text: "You saw X was sad, so you wanted to help and bring him a tissue?" },
  { label: "encouragement", text: "You thought of a way to help X feel better?" },
  { label: "encouragement", text: "It seems like you really care about how X is feeling" },
  { label: "encouragement", text: "You noticed X was crying and found a way to show you care" },
  { label: "encouragement", text: "Comforting your sad friend really helped him." },
  { label: "encouragement", text: "X looks excited that you suggested that!" },
  { label: "encouragement", text: "Sounds like you have a fun idea together" },
  { label: "encouragement", text: "You two look happy to build a train together" },
  { label: "encouragement", text: "Ohhhh – two children playing together, sounds like fun?!" },
  { label: "encouragement", text: "You had an idea and invited X to play, he looked excited!" },
  { label: "encouragement", text: "When Y said yes to your idea, you looked excited too!" },
  { label: "encouragement", text: "Did you find a fun idea for two of you?" },
  { label: "encouragement", text: "You two seem happy when you share ideas?" },
  { label: "encouragement", text: "You’re very excited that you built that long train" },
  { label: "encouragement", text: "You used a lot of blocks for that super long train!" },
  { label: "encouragement", text: "Look what you made It’s very long" },
  { label: "encouragement", text: "You did it You built that all by yourself." },
  { label: "encouragement", text: "You worked hard on your long long train!" },
  { label: "encouragement", text: "Building so long can be tricky, but you did it!" },
  { label: "encouragement", text: "You seem proud of your train!" },
  { label: "encouragement", text: "You came up with a new way to build that train" },
  { label: "encouragement", text: "Building can be tricky, but you didn't give up!" },
  { label: "encouragement", text: "You’re doing lots of clean up!" },
  { label: "encouragement", text: "Wow, you’re carrying a lot of blocks!" },
  { label: "encouragement", text: "Are you working hard?" },
  { label: "encouragement", text: "Those look heavy That’s hard work you’re doing!" },
  { label: "encouragement", text: "This is getting cleaned up fast cause of your work!" },
  { label: "encouragement", text: "Your cleaning up is taking care of our toys!" },
  { label: "encouragement", text: "That was a lot of carrying to clean up You did it!" },
  { label: "encouragement", text: "You look happy that you could carry so much" },
  { label: "encouragement", text: "Now that the floor is clean we have room to play" },
  { label: "encouragement", text: "You made that fit!" },
  { label: "encouragement", text: "That looks tricky trying to figure out where they can all fit!" },
  { label: "encouragement", text: "You’re being so careful fitting them in" },
  { label: "encouragement", text: "You did it You fit it in!" },
  { label: "encouragement", text: "Phew You had to try a lot of things but you figured it out/made it work!" },
  { label: "encouragement", text: "You had to work hard on that!" },
  { label: "encouragement", text: "That was like a puzzle that you had to keep trying different ways to make fit!" },
  { label: "encouragement", text: "You look happy/proud that you worked that out!" },
  { label: "encouragement", text: "You’re making a cleaning up tower!" },
  { label: "encouragement", text: "You’ve made a teamwork tower" },
  { label: "encouragement", text: "I see children working together" },
  { label: "encouragement", text: "Does that idea help the cleaning up?! Look at that!" },
  { label: "encouragement", text: "You’re thinking of new ways to clean up, aren’t you!??" },
  { label: "encouragement", text: "Is it fun doing the clean up tower together?" },
  { label: "encouragement", text: "Did your new idea make clean up faster? More Fun together?" },
  { label: "encouragement", text: "You’re working together so then you can go have snack faster/go outside etc" },
  { label: "encouragement", text: "Now you’re making a cleaning up train!" },
  { label: "encouragement", text: "You’ve made a teamwork train" },
  { label: "encouragement", text: "I see children working together" },
  { label: "encouragement", text: "Looks like a fun way to clean up!" },
  { label: "encouragement", text: "You’re thinking of more new ways to clean up, aren’t you!??" },
  { label: "encouragement", text: "Is it fun doing the clean up train together?" },
  { label: "encouragement", text: "Did your new idea make clean up faster? More Fun together?" },
  { label: "encouragement", text: "You’re working together so then you can go have snack faster/go outside etc" },
  { label: "encouragement", text: "Look It’s all cleaned up. You did a lot of work!" },
  { label: "encouragement", text: "That was a big job You tidied up every last block!" },
  { label: "encouragement", text: "You cleaned up a lot of blocks!" },
  { label: "encouragement", text: "You had two ideas to clean up the blocks – a tower and a train!" },


  { label: "encouragement", text: "That was a big job You tidied up every last piece of lego!" },
  { label: "encouragement", text: "You cleaned up the whole table for snack!" },
  { label: "encouragement", text: "You cleaned up the toys!" },
  { label: "encouragement", text: "You helped him when you gave him the marker." },
  { label: "encouragement", text: "You put the book away gently." },

  // Praise examples
  { label: "praise", text: "Good job" },
  { label: "praise", text: "I like your tower" },
  { label: "praise", text: "High five" },
  { label: "praise", text: "You're a good builder!" },
  { label: "praise", text: "Your tower is great." },
  { label: "praise", text: "I love it!" },
  { label: "praise", text: "I love how you built the tower!" },
  { label: "praise", text: "You're a great builder!" },
  { label: "praise", text: "You're so creative I love the way you built that tower." },
  { label: "praise", text: "Good teamwork" },
  { label: "praise", text: "Good teamwork" },
  { label: "praise", text: "Good job" },
  { label: "praise", text: "High five team" },
  { label: "praise", text: "I like the way you’re playing together" },
  { label: "praise", text: "You're such a good friend" },
  { label: "praise", text: "Good passing blocks" },
  { label: "praise", text: "You're a great sharer" },
  { label: "praise", text: "You're a good friend when you share the blocks" },
  { label: "praise", text: "You're a great helper. Thank you for sharing your toys." },
  { label: "praise", text: "You're a wonderful friend; it's nice to see you playing so nicely together." },
  { label: "praise", text: "I’m happy to see you sharing" },
  { label: "praise", text: "Good sharing" },
  { label: "praise", text: "I like the way you’re sharing" },
  { label: "praise", text: "You're such a good friend" },
  { label: "praise", text: "Good passing blocks" },
  { label: "praise", text: "You're a great sharer" },
  { label: "praise", text: "You're a good friend when you share the blocks" },
  { label: "praise", text: "You're a great helper. Thank you for sharing your toys." },
  { label: "praise", text: "You're a wonderful friend; it's nice to see you playing so nicely together." },
  { label: "praise", text: "I’m happy to see you sharing" },
  { label: "praise", text: "Good sharing" },
  { label: "praise", text: "I like the way you’re sharing" },
  { label: "praise", text: "You're such a good friend" },
  { label: "praise", text: "Good passing blocks" },
  { label: "praise", text: "You're a great sharer" },
  { label: "praise", text: "You're a good friend when you share the blocks" },
  { label: "praise", text: "You're a great helper. Thank you for sharing your toys." },
  { label: "praise", text: "You're a wonderful friend; it's nice to see you playing so nicely together." },
  { label: "praise", text: "I’m happy to see you sharing" },
  { label: "praise", text: "Good sharing" },
  { label: "praise", text: "I like the way you’re sharing" },
  { label: "praise", text: "You're such a good friend" },
  { label: "praise", text: "Good passing blocks" },
  { label: "praise", text: "You're a great sharer" },
  { label: "praise", text: "You're a good friend when you share the blocks" },
  { label: "praise", text: "You're a great helper. Thank you for sharing your toys." },
  { label: "praise", text: "You're a wonderful friend; it's nice to see you playing so nicely together." },
  { label: "praise", text: "I’m happy to see you sharing" },
  { label: "praise", text: "Good sharing" },
  { label: "praise", text: "I like the way you’re sharing" },
  { label: "praise", text: "You're such a good friend" },
  { label: "praise", text: "Good passing blocks" },
  { label: "praise", text: "You're a great sharer" },
  { label: "praise", text: "You're a good friend when you share the blocks" },
  { label: "praise", text: "You're a great helper. Thank you for sharing your toys." },
  { label: "praise", text: "You're a wonderful friend; it's nice to see you playing so nicely together." },

  { label: "praise", text: "I like the way you drew that dog" },
  { label: "praise", text: "I like your dress today" },
  { label: "praise", text: "Your hair looks good like that" },
  { label: "praise", text: "You’re a good painter!" },
  { label: "praise", text: "You’re a nice friend." },
  { label: "praise", text: "Thank you for being my friend." },
  { label: "praise", text: "Thanks for the help." },
  { label: "praise", text: "You are the best."}

];

// Adding labels to the classifier
["encouragement", "praise"].forEach(label => {
  whichx.addLabels(label);
});

// Adding training data to the classifier
trainingData.forEach(data => {
  whichx.addData(data.label, data.text);
});


// Example usage with the updated model
const messages = [
    "It was a real emergency, and you arrived in time for donating blood.",
    "I noticed you helped your friend clean up the toys.",
    "You did good",
    "You did good because you worked so hard. And you totally deserve this",
    "You are awesome." ,
    "I did do that." 
];

messages.forEach(message => {
  const category = whichx.classify(message);
  console.log(`Message: "${message}" Category: ${category}`);
});