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
  };
  const question4: Question = {
    id: test.id + "_question4",
    test_id: test.id,
    text:
      conversation + "What is the man's response to the woman's suggestions?",
    weigh: new Decimal(1),
    type: questionType,
    audioKey: null,
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
