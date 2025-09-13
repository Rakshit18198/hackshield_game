/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    // First, let's clear any existing questions to start fresh
    pgm.sql('DELETE FROM correct_answers WHERE question_id IN (SELECT id FROM questions WHERE game_id IN (1, 2, 3, 4, 5))');
    pgm.sql('DELETE FROM question_options WHERE question_id IN (SELECT id FROM questions WHERE game_id IN (1, 2, 3, 4, 5))');
    pgm.sql('DELETE FROM questions WHERE game_id IN (1, 2, 3, 4, 5)');

    // Insert all questions first and get their IDs
    pgm.sql(`
        INSERT INTO questions (game_id, question_text, question_type, difficulty_level, points, time_limit, order_index) VALUES
        -- Game 1: Phishing Awareness (6 questions)
        (1, 'You receive an email claiming to be from your bank asking you to click a link to verify your account. The email has urgent language and threatens account suspension. What should you do?', 'mcq', 1, 10, 30, 1),
        (1, 'Which of the following is a common sign of a phishing email?', 'mcq', 1, 10, 30, 2),
        (1, 'A legitimate company will never ask for your password via email.', 'true_false', 1, 10, 20, 3),
        (1, 'You receive an email with the subject "URGENT: Your account has been compromised" from support@paypa1.com. What is suspicious about this email address?', 'fill_blank', 2, 15, 45, 4),
        (1, 'Match the following email elements with their risk level: Suspicious links, Urgent language, Company logo, Professional branding', 'drag_drop', 2, 15, 60, 5),
        (1, 'You receive an email from a colleague asking you to wire money urgently. The email seems out of character. What should you do first?', 'scenario', 3, 20, 60, 6),
        
        -- Game 2: Password Panic (5 questions)
        (2, 'Which of the following passwords is the most secure?', 'mcq', 1, 10, 30, 1),
        (2, 'How often should you change your passwords?', 'mcq', 2, 15, 30, 2),
        (2, 'Using the same password for multiple accounts is acceptable if the password is strong.', 'true_false', 1, 10, 20, 3),
        (2, 'What is the minimum recommended length for a strong password?', 'fill_blank', 1, 10, 30, 4),
        (2, 'Which of these is NOT a good password practice?', 'mcq', 2, 15, 45, 5),
        
        -- Game 3: Social Engineering Defense (4 questions)
        (3, 'A stranger calls claiming to be from IT support and asks for your login credentials to fix a "security issue". What should you do?', 'mcq', 2, 15, 45, 1),
        (3, 'Social engineering attacks always involve technical vulnerabilities.', 'true_false', 1, 10, 20, 2),
        (3, 'Someone claiming to be a delivery person asks you to hold the door open for them. What should you consider?', 'mcq', 2, 15, 45, 3),
        (3, 'You find a USB drive in the parking lot. What should you do with it?', 'scenario', 3, 20, 60, 4),
        
        -- Game 4: Network Security Basics (5 questions)
        (4, 'What is the most secure type of wireless network encryption?', 'mcq', 2, 15, 45, 1),
        (4, 'You should always connect to public WiFi networks when available.', 'true_false', 1, 10, 20, 2),
        (4, 'What does VPN stand for and what is its primary purpose?', 'fill_blank', 2, 15, 60, 3),
        (4, 'Which of the following is a common network security threat?', 'mcq', 1, 10, 30, 4),
        (4, 'You notice unusual network activity on your computer. What should be your first step?', 'scenario', 2, 15, 60, 5),
        
        -- Game 5: Data Protection Challenge (5 questions)
        (5, 'What is the best way to dispose of sensitive documents?', 'mcq', 1, 10, 30, 1),
        (5, 'Personal data should only be shared with authorized personnel.', 'true_false', 1, 10, 20, 2),
        (5, 'What does GDPR stand for?', 'fill_blank', 2, 15, 45, 3),
        (5, 'You accidentally send an email with sensitive information to the wrong person. What should you do immediately?', 'scenario', 2, 15, 60, 4),
        (5, 'Which of the following is considered personal identifiable information (PII)?', 'mcq', 1, 10, 30, 5)
    `);

    // Now insert MCQ options using the actual question IDs
    pgm.sql(`
        INSERT INTO question_options (question_id, option_text, is_correct, order_index, explanation) VALUES
        -- Game 1: Phishing Awareness - Question 1
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 1), 'Click the link immediately to avoid account suspension', false, 1, 'Never click links in suspicious emails, especially those with urgent language'),
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 1), 'Call your bank using the number from their official website', true, 2, 'Always verify with the company using official contact information'),
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 1), 'Reply to the email asking for more information', false, 3, 'Replying to phishing emails confirms your email is active'),
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 1), 'Forward the email to all your contacts to warn them', false, 4, 'This spreads the phishing attempt and could harm others'),
        
        -- Game 1: Phishing Awareness - Question 2
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 2), 'Professional company logo and branding', false, 1, 'Phishers often copy legitimate branding'),
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 2), 'Urgent language demanding immediate action', true, 2, 'Urgency is a common phishing tactic to bypass critical thinking'),
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 2), 'Proper grammar and spelling', false, 3, 'While some phishing emails have poor grammar, many are well-written'),
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 2), 'Links to the company website', false, 4, 'Phishers often include legitimate-looking links'),
        
        -- Game 2: Password Panic - Question 1
        ((SELECT id FROM questions WHERE game_id = 2 AND order_index = 1), 'password123', false, 1, 'This is a very weak password - common words with numbers'),
        ((SELECT id FROM questions WHERE game_id = 2 AND order_index = 1), 'P@ssw0rd!', false, 2, 'While it has special characters, it''s still based on a common word'),
        ((SELECT id FROM questions WHERE game_id = 2 AND order_index = 1), 'MyDogSpot2023!', false, 3, 'Personal information is easily guessable'),
        ((SELECT id FROM questions WHERE game_id = 2 AND order_index = 1), 'K9#mN2$pL8@vX5', true, 4, 'Random characters, numbers, and symbols make the strongest passwords'),
        
        -- Game 2: Password Panic - Question 2
        ((SELECT id FROM questions WHERE game_id = 2 AND order_index = 2), 'Every week', false, 1, 'Too frequent changes can lead to weaker passwords'),
        ((SELECT id FROM questions WHERE game_id = 2 AND order_index = 2), 'Every 3-6 months', true, 2, 'Regular but not excessive changes help maintain security'),
        ((SELECT id FROM questions WHERE game_id = 2 AND order_index = 2), 'Only when there''s a data breach', false, 3, 'Proactive changes are better than reactive'),
        ((SELECT id FROM questions WHERE game_id = 2 AND order_index = 2), 'Once a year', false, 4, 'Too infrequent for sensitive accounts'),
        
        -- Game 2: Password Panic - Question 5
        ((SELECT id FROM questions WHERE game_id = 2 AND order_index = 5), 'Using a password manager', false, 1, 'Password managers are highly recommended'),
        ((SELECT id FROM questions WHERE game_id = 2 AND order_index = 5), 'Writing passwords on sticky notes', true, 2, 'Physical notes can be easily found and stolen'),
        ((SELECT id FROM questions WHERE game_id = 2 AND order_index = 5), 'Using two-factor authentication', false, 3, '2FA significantly improves security'),
        ((SELECT id FROM questions WHERE game_id = 2 AND order_index = 5), 'Creating unique passwords for each account', false, 4, 'This is a best practice'),
        
        -- Game 3: Social Engineering Defense - Question 1
        ((SELECT id FROM questions WHERE game_id = 3 AND order_index = 1), 'Provide your credentials to help resolve the issue', false, 1, 'Never share credentials with unsolicited callers'),
        ((SELECT id FROM questions WHERE game_id = 3 AND order_index = 1), 'Ask for their employee ID and call back the main IT number', true, 2, 'Always verify identity through official channels'),
        ((SELECT id FROM questions WHERE game_id = 3 AND order_index = 1), 'Give them your username but not password', false, 3, 'Even partial information can be dangerous'),
        ((SELECT id FROM questions WHERE game_id = 3 AND order_index = 1), 'Hang up immediately without saying anything', false, 4, 'While safe, verification is better than ignoring'),
        
        -- Game 3: Social Engineering Defense - Question 3
        ((SELECT id FROM questions WHERE game_id = 3 AND order_index = 3), 'Always let them in to be helpful', false, 1, 'This could be a security risk'),
        ((SELECT id FROM questions WHERE game_id = 3 AND order_index = 3), 'Ask for identification and verify with building security', true, 2, 'Always verify identity before granting access'),
        ((SELECT id FROM questions WHERE game_id = 3 AND order_index = 3), 'Ignore them completely', false, 3, 'Being helpful is good, but with proper verification'),
        ((SELECT id FROM questions WHERE game_id = 3 AND order_index = 3), 'Hold the door open for anyone who asks', false, 4, 'This is a major security risk'),
        
        -- Game 4: Network Security Basics - Question 1
        ((SELECT id FROM questions WHERE game_id = 4 AND order_index = 1), 'WEP (Wired Equivalent Privacy)', false, 1, 'WEP is outdated and easily cracked'),
        ((SELECT id FROM questions WHERE game_id = 4 AND order_index = 1), 'WPA (Wi-Fi Protected Access)', false, 2, 'WPA is better than WEP but still vulnerable'),
        ((SELECT id FROM questions WHERE game_id = 4 AND order_index = 1), 'WPA2 (Wi-Fi Protected Access 2)', false, 3, 'WPA2 is good but WPA3 is newer and more secure'),
        ((SELECT id FROM questions WHERE game_id = 4 AND order_index = 1), 'WPA3 (Wi-Fi Protected Access 3)', true, 4, 'WPA3 is the most secure current standard'),
        
        -- Game 4: Network Security Basics - Question 4
        ((SELECT id FROM questions WHERE game_id = 4 AND order_index = 4), 'Man-in-the-middle attacks', false, 1, 'This is a network threat but not the most common'),
        ((SELECT id FROM questions WHERE game_id = 4 AND order_index = 4), 'Malware infections', false, 2, 'This is a threat but not specifically network-related'),
        ((SELECT id FROM questions WHERE game_id = 4 AND order_index = 4), 'Weak or default passwords', true, 3, 'This is one of the most common network security issues'),
        ((SELECT id FROM questions WHERE game_id = 4 AND order_index = 4), 'Physical theft of devices', false, 4, 'This is a physical security issue, not network-specific'),
        
        -- Game 5: Data Protection Challenge - Question 1
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 1), 'Throw them in the regular trash', false, 1, 'This is a major security risk'),
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 1), 'Recycle them with other paper', false, 2, 'Recycling doesn''t destroy sensitive information'),
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 1), 'Shred them using a cross-cut shredder', true, 3, 'Proper shredding ensures data cannot be reconstructed'),
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 1), 'Burn them in your backyard', false, 4, 'This is dangerous and may not be legal'),
        
        -- Game 5: Data Protection Challenge - Question 5
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 5), 'Only your name', false, 1, 'Name alone is not always considered PII'),
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 5), 'Your email address', false, 2, 'Email alone may not be PII depending on context'),
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 5), 'Your Social Security number', true, 3, 'SSN is always considered sensitive PII'),
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 5), 'Your favorite color', false, 4, 'This is not considered PII')
    `);

    // Insert correct answers for non-MCQ questions
    pgm.sql(`
        INSERT INTO correct_answers (question_id, answer_text, is_case_sensitive, partial_match_allowed) VALUES
        -- Game 1: Phishing Awareness - True/False
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 3), 'true', false, false),
        
        -- Game 1: Phishing Awareness - Fill in the blank
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 4), 'The "1" in "paypa1" instead of "l"', false, true),
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 4), 'paypa1.com uses the number 1 instead of letter l', false, true),
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 4), 'The domain uses a number instead of a letter', false, true),
        
        -- Game 1: Phishing Awareness - Drag and drop
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 5), 'suspicious links: high risk', false, true),
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 5), 'urgent language: high risk', false, true),
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 5), 'company logo: low risk', false, true),
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 5), 'professional branding: low risk', false, true),
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 5), 'high risk: suspicious links', false, true),
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 5), 'high risk: urgent language', false, true),
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 5), 'low risk: company logo', false, true),
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 5), 'low risk: professional branding', false, true),
        
        -- Game 1: Phishing Awareness - Scenario
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 6), 'verify the request through a different channel', false, true),
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 6), 'call the colleague directly', false, true),
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 6), 'contact them through official channels', false, true),
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 6), 'verify the email address', false, true),
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 6), 'check if the request is legitimate', false, true),
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 6), 'do not wire money immediately', false, true),
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 6), 'investigate the request first', false, true),
        ((SELECT id FROM questions WHERE game_id = 1 AND order_index = 6), 'confirm the urgency through other means', false, true),
        
        -- Game 2: Password Panic - True/False
        ((SELECT id FROM questions WHERE game_id = 2 AND order_index = 3), 'false', false, false),
        
        -- Game 2: Password Panic - Fill in the blank
        ((SELECT id FROM questions WHERE game_id = 2 AND order_index = 4), '12', false, true),
        ((SELECT id FROM questions WHERE game_id = 2 AND order_index = 4), 'twelve', false, true),
        ((SELECT id FROM questions WHERE game_id = 2 AND order_index = 4), '12 characters', false, true),
        ((SELECT id FROM questions WHERE game_id = 2 AND order_index = 4), 'at least 12', false, true),
        
        -- Game 3: Social Engineering Defense - True/False
        ((SELECT id FROM questions WHERE game_id = 3 AND order_index = 2), 'false', false, false),
        
        -- Game 3: Social Engineering Defense - Scenario
        ((SELECT id FROM questions WHERE game_id = 3 AND order_index = 4), 'do not plug it into any computer', false, true),
        ((SELECT id FROM questions WHERE game_id = 3 AND order_index = 4), 'turn it in to IT security', false, true),
        ((SELECT id FROM questions WHERE game_id = 3 AND order_index = 4), 'hand it to security personnel', false, true),
        ((SELECT id FROM questions WHERE game_id = 3 AND order_index = 4), 'never use found USB drives', false, true),
        ((SELECT id FROM questions WHERE game_id = 3 AND order_index = 4), 'it could contain malware', false, true),
        
        -- Game 4: Network Security Basics - True/False
        ((SELECT id FROM questions WHERE game_id = 4 AND order_index = 2), 'false', false, false),
        
        -- Game 4: Network Security Basics - Fill in the blank
        ((SELECT id FROM questions WHERE game_id = 4 AND order_index = 3), 'Virtual Private Network', false, true),
        ((SELECT id FROM questions WHERE game_id = 4 AND order_index = 3), 'VPN', false, true),
        ((SELECT id FROM questions WHERE game_id = 4 AND order_index = 3), 'Virtual Private Network - secure connection', false, true),
        ((SELECT id FROM questions WHERE game_id = 4 AND order_index = 3), 'VPN - secure encrypted connection', false, true),
        
        -- Game 4: Network Security Basics - Scenario
        ((SELECT id FROM questions WHERE game_id = 4 AND order_index = 5), 'disconnect from the network immediately', false, true),
        ((SELECT id FROM questions WHERE game_id = 4 AND order_index = 5), 'run a security scan', false, true),
        ((SELECT id FROM questions WHERE game_id = 4 AND order_index = 5), 'check for unauthorized access', false, true),
        ((SELECT id FROM questions WHERE game_id = 4 AND order_index = 5), 'monitor network traffic', false, true),
        ((SELECT id FROM questions WHERE game_id = 4 AND order_index = 5), 'contact IT security', false, true),
        
        -- Game 5: Data Protection Challenge - True/False
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 2), 'true', false, false),
        
        -- Game 5: Data Protection Challenge - Fill in the blank
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 3), 'General Data Protection Regulation', false, true),
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 3), 'GDPR', false, true),
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 3), 'General Data Protection Regulation - EU privacy law', false, true),
        
        -- Game 5: Data Protection Challenge - Scenario
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 4), 'contact the recipient immediately', false, true),
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 4), 'ask them to delete the email', false, true),
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 4), 'report the incident to IT security', false, true),
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 4), 'document the incident', false, true),
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 4), 'notify your supervisor', false, true),
        
        -- Game 5: Data Protection Challenge - Fill in the blank (PII)
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 5), 'Social Security number', false, true),
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 5), 'SSN', false, true),
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 5), 'credit card number', false, true),
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 5), 'driver''s license number', false, true),
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 5), 'passport number', false, true),
        ((SELECT id FROM questions WHERE game_id = 5 AND order_index = 5), 'medical record number', false, true)
    `);
};

exports.down = pgm => {
    // Remove all questions and related data
    pgm.sql('DELETE FROM correct_answers WHERE question_id IN (SELECT id FROM questions WHERE game_id IN (1, 2, 3, 4, 5))');
    pgm.sql('DELETE FROM question_options WHERE question_id IN (SELECT id FROM questions WHERE game_id IN (1, 2, 3, 4, 5))');
    pgm.sql('DELETE FROM questions WHERE game_id IN (1, 2, 3, 4, 5)');
}; 