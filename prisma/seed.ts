import { PrismaClient, type Question, type Test } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
export const prisma = new PrismaClient();

async function main() {
  await testSeeder();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

/**
 * TESTS AND QUESTIONS
 */
async function testSeeder() {
  await generateConversationTest(
    {
      id: "seededTest0",
      name: "Conversations",
      description: "Reading and Writing",
      type: 1,
      difficulty: 1,
    },
    "textToText"
  );
  await generateConversationTest(
    {
      id: "seededTest1",
      name: "Conversations",
      description: "Reading and Speaking",
      type: 1,
      difficulty: 1,
    },
    "textToVideo"
  );
  await generateAudioTest({
    id: "seededTest2",
    name: "Conversations",
    description: "Listening and Speaking",
    type: 1,
    difficulty: 0,
  });
  await generateEvaluation();
}

async function generateConversationTest(test: Test, questionType: string) {
  await prisma.test.upsert({
    where: {
      id: test.id,
    },
    create: test,
    update: test,
  });

  // Questions
  const question1: Question = {
    id: test.id + "_question1",
    test_id: test.id,
    text: conversation + "What is the main topic of this conversation?",
    weigh: new Decimal(1),
    type: questionType,
    audioKey: null,
    audioTranscript: null,
  };
  const question2: Question = {
    id: test.id + "_question2",
    test_id: test.id,
    text:
      conversation +
      "How does the woman feel about the man's initial project proposal?",
    weigh: new Decimal(1),
    type: questionType,
    audioKey: null,
    audioTranscript: null,
  };
  const question3: Question = {
    id: test.id + "_question3",
    test_id: test.id,
    text:
      conversation +
      "According to the woman, what should be changed in the project proposal?",
    weigh: new Decimal(1),
    type: questionType,
    audioKey: null,
    audioTranscript: null,
  };
  const question4: Question = {
    id: test.id + "_question4",
    test_id: test.id,
    text:
      conversation + "What is the man's response to the woman's suggestions?",
    weigh: new Decimal(1),
    type: questionType,
    audioKey: null,
    audioTranscript: null,
  };
  const question5: Question = {
    id: test.id + "_question5",
    test_id: test.id,
    text:
      conversation +
      "How does the man feel about working with the woman on this project?",
    weigh: new Decimal(1),
    type: questionType,
    audioKey: null,
    audioTranscript: null,
  };
  const question6: Question = {
    id: test.id + "_question6",
    test_id: test.id,
    text:
      conversation +
      "What does this conversation suggest about the professional relationship between the man and the woman?",
    weigh: new Decimal(1),
    type: questionType,
    audioKey: null,
    audioTranscript: null,
  };

  await prisma.question.upsert({
    where: { id: test.id + "_question1" },
    create: question1,
    update: question1,
  });
  await prisma.question.upsert({
    where: { id: test.id + "_question2" },
    create: question2,
    update: question2,
  });
  await prisma.question.upsert({
    where: { id: test.id + "_question3" },
    create: question3,
    update: question3,
  });
  await prisma.question.upsert({
    where: { id: test.id + "_question4" },
    create: question4,
    update: question4,
  });
  await prisma.question.upsert({
    where: { id: test.id + "_question5" },
    create: question5,
    update: question5,
  });
  await prisma.question.upsert({
    where: { id: test.id + "_question6" },
    create: question6,
    update: question6,
  });
}

const conversation = `Read the following conversation:

Man: Good morning, Jane. How are you today?
Woman: Good morning, John. I'm doing well, thank you. What about you?
Man: I'm good, too, thank you. I wanted to discuss the plans for our upcoming project. Do you have a minute?
Woman: Of course. I was just reviewing the proposal you sent last week. I have a few suggestions.
Man: Great! I'm all ears.
Woman: First of all, I think we should consider involving the IT department earlier than proposed. They might provide some useful insights on the technical aspects.
Man: That's a good point, Jane. I hadn't considered that. Anything else?
Woman: Yes, I also believe we should adjust the timeline. It's quite optimistic, and we could face unforeseen issues.
Man: I see. That's true. We should leave some room for potential hurdles. Thank you for your suggestions, Jane. I'll revise the proposal accordingly.
Woman: You're welcome, John. I'm looking forward to working on this project.
Man: Me too, Jane. I appreciate your constructive feedback.

`;

async function generateAudioTest(test: Test) {
  await prisma.test.upsert({
    where: {
      id: test.id,
    },
    create: test,
    update: test,
  });

  const question1: Question = {
    id: test.id + "_question1",
    test_id: test.id,
    text: "Is the woman interested in admitting the man to the band? Why?",
    weigh: new Decimal(1),
    type: "audioToVideo",
    audioKey: `questions/${test.id}_question1.mp3`,
    audioTranscript: transcript1,
  };

  const question2: Question = {
    id: test.id + "_question2",
    test_id: test.id,
    text: "What mistake did the woman make when typing the man's postcode?",
    weigh: new Decimal(1),
    type: "audioToVideo",
    audioKey: `questions/${test.id}_question2.mp3`,
    audioTranscript: transcript2,
  };

  const question3: Question = {
    id: test.id + "_question3",
    test_id: test.id,
    text: "Why is Ismael tired of school?",
    weigh: new Decimal(1),
    type: "audioToVideo",
    audioKey: `questions/${test.id}_question3.mp3`,
    audioTranscript: transcript3,
  };

  await prisma.question.upsert({
    where: { id: test.id + "_question1" },
    create: question1,
    update: question1,
  });
  await prisma.question.upsert({
    where: { id: test.id + "_question2" },
    create: question2,
    update: question2,
  });
  await prisma.question.upsert({
    where: { id: test.id + "_question3" },
    create: question3,
    update: question3,
  });
}

const transcript1 = `
Man: Oh band auditions! Great! I'd love to be in a band.
*Man Knocks on the door and the woman opens the door*
Man: Hello, is this the band audition?
Woman: Hello! Yes.
*Woman closes door*
Woman:  So, you'd like to be in our band?
Man: Yes, I love music!
Woman: Well we need a singer, a guitarist and a drummer
Man: Oh I love singing!
Woman: Okay you can sing! Let's sing the beginning of this song
Man: *sings bohemian rhapsody horribly*
Woman: Right.. Okay, maybe not. Can you play an instrument?
Man: I can play the guitar a little.
Man: *Plays the guitar horribly*
Woman: That's it?
Man: Uh… yeah, I can't remember anymore.
Woman: Uhmm, can you play the drums?
Man: Yeah sure!
Man: *Plays drums really bad*
Woman: Okay stop! That's enough. What about.. the maracas? Can you play the maracas?
Man: Yes I can! 
Man: *plays maracas badly*
Woman: Great! Uhm, thanks for coming! I'll call you next week.
`;

const transcript2 = `
Woman: International student ID card?
Man: Yes, that's right.
Woman: Have you got the form?
Man: Yes, here it is.
*Man pulls form out*
Woman: Okay let's see, name… Achmed, surname…Saeed, age 14, address, Oh.. what's you address?
Man: Fourteen Spring Avenue
Woman: Fourteen… Spring… Avenue
Man: Leicester
Woman: Can you Spell that please?
Man: L-E-I-C-E-S-T-E-R
Woman: Mhmm, what's your postcode?
Man: L-E-1-4-2-G-Z
Woman: L-E-1-4-2-G-S
Man: No, 2-G-Z
Woman: Oh okay… 2-G-Z. And what's your nationality?
Man: I'm… British
Woman: What's your School
Man: NewTown Secondary School… N-E-W-T-O-W-N
Woman: What's your date of birth?
Man: The second of june, 1998
Woman: The second of the sixth… 1998. Oh have you got a photo?
Man: Yes, here you are.
*Man pulls photo*
Woman: Oh thank you, one moment please.
Woman: And here's your ID card!
Man: Thanks! Bye!
`;

const transcript3 = `
Jack: Hi Ismael! How are you?
Ismael: Hi Jack… I'm okay but I've got loads of homework.
Jack: Aha me too! But would you like to come with us to the cinema tonight?
Ismael: Who's us?
Jack: Me, Jamie, Nicola and Selena.
Ismael: Mh okay, and what's the film?
Jack: Hmm we don't know, we can't decide. There's that new horror film “Light and Dark”.
Ismael: No no no, I don't like horror films.
Jack: Huh, okay, well there's a comedy about a school!
Ismael: Ugh no more school please! What about a romcom?
Jack: Romcom?
Ismael: You know… romantic comedy, boy meets girl
Jack: Oh what really! Ugh no I hate romantic films! I like action.
Ismael: Well there's a new science fiction film, Alien Attacks.
Jack: Okay I like science fiction, let's see that.
Ismael: Okay, I'll ask the others if they like Sci-Fi.
Jack: What time is the film?
Ismael: At Eight o clock, let's meet at 7:30 outside the cinema.
Jack: Okay, see ya later!
Ismael: Bye!
`;

async function generateEvaluation() {
  const test: Test = {
    id: "evaluation",
    name: "Evaluation",
    description: null,
    type: 0,
    difficulty: 4,
  };

  await prisma.test.upsert({
    where: {
      id: test.id,
    },
    create: test,
    update: test,
  });

  const question1: Question = {
    id: test.id + "_question1",
    test_id: test.id,
    text: 'Read the following article:\n\n"Climate change is a pressing global issue with far-reaching consequences. Rising temperatures, melting glaciers, and extreme weather events are some of the signs of climate change. It is primarily caused by human activities, such as burning fossil fuels and deforestation."\n\nBased on the article, what are some of the signs and causes of climate change?',
    weigh: new Decimal(1),
    type: "textToVideo",
    audioKey: null,
    audioTranscript: null,
  };

  const question2: Question = {
    id: test.id + "_question2",
    test_id: test.id,
    text: 'Read the following conversation:\n\nSarah: Have you watched the latest episode of the TV series "The Crown"? It\'s getting rave reviews.\n\nEmma: No, I haven\'t had the chance yet. What makes it so popular?\n\nSarah: Well, the show offers a captivating portrayal of the British royal family, exploring their history, scandals, and personal lives. The production values and performances are top-notch too.\n\nWhy is the TV series "The Crown" receiving positive reviews according to Sarah?',
    weigh: new Decimal(1),
    type: "textToVideo",
    audioKey: null,
    audioTranscript: null,
  };

  const question3: Question = {
    id: test.id + "_question3",
    test_id: test.id,
    text: 'Read the following article:\n\n"Social media has revolutionized the way people connect and communicate. Platforms like Facebook, Twitter, and Instagram have become integral parts of many people\'s lives. However, there are concerns about the impact of excessive social media use on mental health and privacy."\n\nAccording to the article, what are the potential negative effects of excessive social media use?',
    weigh: new Decimal(1),
    type: "textToVideo",
    audioKey: null,
    audioTranscript: null,
  };

  await prisma.question.upsert({
    where: { id: test.id + "_question1" },
    create: question1,
    update: question1,
  });
  await prisma.question.upsert({
    where: { id: test.id + "_question2" },
    create: question2,
    update: question2,
  });
  await prisma.question.upsert({
    where: { id: test.id + "_question3" },
    create: question3,
    update: question3,
  });
}
