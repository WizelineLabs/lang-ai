-- CreateTable
CREATE TABLE "questions" (
    "id" BIGSERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "weigh" DECIMAL NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" BIGSERIAL NOT NULL,
    "firstName" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "gender" VARCHAR NOT NULL,
    "email" CHAR[],
    "password" CHAR[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userTest" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGSERIAL NOT NULL,
    "test_id" BIGSERIAL NOT NULL,
    "submitted" BOOLEAN NOT NULL,
    "score" DECIMAL NOT NULL,

    CONSTRAINT "userTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userTestAnswer" (
    "id" BIGSERIAL NOT NULL,
    "question_id" BIGSERIAL NOT NULL,
    "userTest_id" BIGSERIAL NOT NULL,
    "answer" VARCHAR NOT NULL,
    "date" DATE NOT NULL,
    "evaluation" DECIMAL NOT NULL,

    CONSTRAINT "userTestAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userTest" ADD CONSTRAINT "test_id" FOREIGN KEY ("test_id") REFERENCES "test"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "userTest" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "userTestAnswer" ADD CONSTRAINT "question_id" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "userTestAnswer" ADD CONSTRAINT "userTest_id" FOREIGN KEY ("userTest_id") REFERENCES "userTest"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
