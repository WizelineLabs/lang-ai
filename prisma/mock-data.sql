-- Insert tests
INSERT INTO "Test" (id, name, type, difficulty) 
VALUES 
('test1', 'English Assessment - Beginner', 0, 0),
('test2', 'English Assessment - Intermediate', 0, 1),
('test3', 'English Assessment - Advanced', 0, 2);

-- Insert questions for each test
-- Questions for Test 1
INSERT INTO "Question" (id, text, type, weigh, test_id) 
VALUES 
('question1', 'Choose the correct verb form: He __ a bike yesterday. (ride)', '0', 1, 'test1'),
('question2', 'Select the correct option: I ___ like coffee. (do not)', '0', 1, 'test1'),
('question3', 'Fill in the blank: She ____ to the park last night. (go)', '0', 1, 'test1'),
('question4', 'Correct the sentence: I cans play the piano.', '0', 1, 'test1'),
('question5', 'Select the right option: We ____ playing soccer. (are)', '0', 1, 'test1');

-- Questions for Test 2
INSERT INTO "Question" (id, text, type, weigh, test_id) 
VALUES 
('question6', 'Choose the correct verb form: They ___ a new house last year. (buy)', '1', 1, 'test2'),
('question7', 'Select the correct option: She ___ not believe in ghosts. (does)', '1', 1, 'test2'),
('question8', 'Fill in the blank: We ____ to the concert next week. (go)', '1', 1, 'test2'),
('question9', 'Correct the sentence: She don like tea.', '1', 1, 'test2'),
('question10', 'Select the right option: He ____ playing basketball. (is)', '1', 1, 'test2');

-- Questions for Test 3
INSERT INTO "Question" (id, text, type, weigh, test_id) 
VALUES 
('question11', 'Choose the correct verb form: We ____ a huge profit last month. (make)', '2', 1, 'test3'),
('question12', 'Select the correct option: I ____ not understand this concept. (do)', '2', 1, 'test3'),
('question13', 'Fill in the blank: They ____ to Europe next month. (travel)', '2', 1, 'test3'),
('question14', 'Correct the sentence: He doesn play guitar.', '2', 1, 'test3'),
('question15', 'Select the right option: She ____ writing a novel. (is)', '2', 1, 'test3');
