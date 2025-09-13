export const CYBERSECURITY_QUESTIONS = {
  "questions": {
    "1": {
      "question": "What does 'phishing' refer to in cybersecurity?",
      "options": [
        "Catching network packets for analysis",
        "Fraudulent attempts to obtain sensitive information",
        "A type of firewall configuration method",
        "Password encryption and hashing technique"
      ],
      "correct": 1,
      "explanation": "Phishing is a fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity in electronic communications.",
      "points": 100,
      "difficulty": "easy"
    },
    "2": {
      "question": "What is the primary purpose of a firewall in network security?",
      "options": [
        "To encrypt all network data transmissions",
        "To create automated system backups",
        "To monitor and control network traffic",
        "To scan files for malware and viruses"
      ],
      "correct": 2,
      "explanation": "A firewall monitors and controls incoming and outgoing network traffic based on predetermined security rules.",
      "points": 150,
      "difficulty": "easy"
    },
    "3": {
      "question": "Which attack method specifically targets database systems?",
      "options": [
        "Cross-site scripting (XSS)",
        "Distributed Denial of Service (DDoS)",
        "SQL injection attacks",
        "Man-in-the-middle attacks"
      ],
      "correct": 2,
      "explanation": "SQL injection attacks target database systems by inserting malicious SQL code into application queries to access or manipulate data.",
      "points": 200,
      "difficulty": "medium"
    },
    "4": {
      "question": "What is the main principle behind two-factor authentication (2FA)?",
      "options": [
        "Using two different passwords simultaneously",
        "Requiring two separate authentication methods",
        "Creating two different user accounts",
        "Encrypting data with two different algorithms"
      ],
      "correct": 1,
      "explanation": "2FA requires two different authentication factors: something you know (password) and something you have (phone/token) or something you are (biometrics).",
      "points": 200,
      "difficulty": "medium"
    },
    "5": {
      "question": "What is the primary characteristic of ransomware attacks?",
      "options": [
        "Stealing user passwords and credentials",
        "Encrypting files and demanding payment",
        "Sending large volumes of spam emails",
        "Creating fraudulent websites and domains"
      ],
      "correct": 1,
      "explanation": "Ransomware encrypts victim's files and demands payment (ransom) for the decryption key to restore access to the data.",
      "points": 250,
      "difficulty": "medium"
    },
    "6": {
      "question": "What does the CIA triad represent in information security?",
      "options": [
        "Central Intelligence Agency security protocols",
        "Confidentiality, Integrity, and Availability",
        "Cybersecurity Information and Analytics",
        "Critical Infrastructure Assessment standards"
      ],
      "correct": 1,
      "explanation": "The CIA triad represents the three fundamental principles of information security: Confidentiality, Integrity, and Availability.",
      "points": 300,
      "difficulty": "hard"
    },
    "7": {
      "question": "Which encryption method is considered asymmetric?",
      "options": [
        "Advanced Encryption Standard (AES)",
        "Data Encryption Standard (DES)",
        "RSA (Rivest-Shamir-Adleman)",
        "Blowfish cipher algorithm"
      ],
      "correct": 2,
      "explanation": "RSA is an asymmetric encryption algorithm that uses a pair of keys (public and private) for encryption and decryption.",
      "points": 350,
      "difficulty": "hard"
    },
    "8": {
      "question": "What is a zero-day vulnerability?",
      "options": [
        "A vulnerability that exists for exactly one day",
        "A security flaw unknown to security vendors",
        "An attack that happens at midnight",
        "A vulnerability with zero impact on systems"
      ],
      "correct": 1,
      "explanation": "A zero-day vulnerability is a security flaw that is unknown to security vendors and has no available patch or fix.",
      "points": 400,
      "difficulty": "hard"
    },
    "9": {
      "question": "What is the purpose of penetration testing?",
      "options": [
        "To physically penetrate secure facilities",
        "To test network connection speeds",
        "To simulate cyberattacks on systems",
        "To penetrate encrypted data files"
      ],
      "correct": 2,
      "explanation": "Penetration testing simulates cyberattacks on systems to identify vulnerabilities and security weaknesses before malicious actors exploit them.",
      "points": 400,
      "difficulty": "hard"
    },
    "10": {
      "question": "Which protocol provides secure communication over the internet?",
      "options": [
        "HTTP (HyperText Transfer Protocol)",
        "FTP (File Transfer Protocol)",
        "HTTPS (HTTP Secure)",
        "SMTP (Simple Mail Transfer Protocol)"
      ],
      "correct": 2,
      "explanation": "HTTPS uses SSL/TLS encryption to provide secure communication over the internet, protecting data in transit.",
      "points": 450,
      "difficulty": "expert"
    },
    "11": {
      "question": "What is social engineering in cybersecurity?",
      "options": [
        "Building secure network infrastructures",
        "Manipulating people to divulge confidential information",
        "Engineering software for social media platforms",
        "Creating user-friendly security interfaces"
      ],
      "correct": 1,
      "explanation": "Social engineering involves manipulating people psychologically to perform actions or divulge confidential information.",
      "points": 500,
      "difficulty": "expert"
    },
    "12": {
      "question": "What is the difference between a virus and a worm?",
      "options": [
        "Viruses are faster than worms",
        "Worms require host files, viruses don't",
        "Viruses require host files, worms self-replicate",
        "There is no difference between them"
      ],
      "correct": 2,
      "explanation": "Viruses need to attach to host files to spread, while worms can self-replicate and spread independently across networks.",
      "points": 550,
      "difficulty": "expert"
    }
  },
  "settings": {
    "timeLimit": 30,
    "passingScore": 70,
    "maxAttempts": 1,
    "shuffleOptions": false,
    "showExplanation": true
  }
};

export const CYBERSECURITY_INFO = {
  "1": {
    "title": "Understanding Phishing Attacks",
    "content": "Phishing is one of the most common cybersecurity threats. Attackers disguise themselves as trustworthy entities to steal sensitive information like passwords, credit card numbers, or personal data. They often use fake emails, websites, or messages that look legitimate.",
    "keyPoints": [
      "Always verify sender identity before clicking links",
      "Check URL carefully for suspicious domains",
      "Never share personal information via email",
      "Use two-factor authentication when possible"
    ],
    "icon": "🎣"
  },
  "2": {
    "title": "Firewall Protection",
    "content": "Firewalls act as a security barrier between your network and potential threats from the internet. They monitor incoming and outgoing network traffic and block suspicious activities based on predetermined security rules.",
    "keyPoints": [
      "Enable firewall on all devices",
      "Keep firewall rules updated",
      "Monitor firewall logs regularly",
      "Use both software and hardware firewalls"
    ],
    "icon": "🛡️"
  },
  "3": {
    "title": "SQL Injection Prevention",
    "content": "SQL injection attacks target database systems by inserting malicious SQL code into application queries. This can allow attackers to access, modify, or delete sensitive data stored in databases.",
    "keyPoints": [
      "Use parameterized queries",
      "Validate and sanitize user input",
      "Apply principle of least privilege",
      "Regular security testing of databases"
    ],
    "icon": "💉"
  },
  "4": {
    "title": "Two-Factor Authentication (2FA)",
    "content": "2FA adds an extra layer of security by requiring two different authentication methods. This significantly reduces the risk of unauthorized access even if your password is compromised.",
    "keyPoints": [
      "Use authenticator apps over SMS when possible",
      "Enable 2FA on all important accounts",
      "Keep backup codes in a secure location",
      "Never share authentication codes"
    ],
    "icon": "🔐"
  },
  "5": {
    "title": "Ransomware Protection",
    "content": "Ransomware encrypts your files and demands payment for decryption. It's crucial to have preventive measures in place as recovery can be difficult and expensive.",
    "keyPoints": [
      "Regular automated backups",
      "Keep software updated",
      "Don't click suspicious links or attachments",
      "Use reputable antivirus software"
    ],
    "icon": "🔒"
  },
  "6": {
    "title": "CIA Triad - Security Fundamentals",
    "content": "The CIA triad represents the three core principles of information security: Confidentiality (protecting data from unauthorized access), Integrity (ensuring data accuracy), and Availability (ensuring data is accessible when needed).",
    "keyPoints": [
      "Confidentiality: Encrypt sensitive data",
      "Integrity: Use checksums and digital signatures",
      "Availability: Implement redundancy and backups",
      "Balance all three aspects for complete security"
    ],
    "icon": "🔺"
  },
  "7": {
    "title": "Asymmetric Encryption",
    "content": "Asymmetric encryption uses a pair of mathematically related keys: a public key for encryption and a private key for decryption. This enables secure communication without sharing secret keys beforehand.",
    "keyPoints": [
      "Public key can be shared openly",
      "Private key must be kept secret",
      "Enables digital signatures",
      "Foundation of secure internet communications"
    ],
    "icon": "🗝️"
  },
  "8": {
    "title": "Zero-Day Vulnerabilities",
    "content": "Zero-day vulnerabilities are security flaws that are unknown to security vendors and have no available patches. They're particularly dangerous because systems are defenseless until a fix is developed.",
    "keyPoints": [
      "Keep all software updated",
      "Use behavior-based security tools",
      "Implement network segmentation",
      "Have incident response plans ready"
    ],
    "icon": "⚡"
  },
  "9": {
    "title": "Penetration Testing",
    "content": "Penetration testing involves simulating cyberattacks on systems to identify vulnerabilities before malicious actors can exploit them. It's a proactive approach to security.",
    "keyPoints": [
      "Regular testing schedules",
      "Use both automated and manual testing",
      "Test from internal and external perspectives",
      "Document and fix discovered vulnerabilities"
    ],
    "icon": "🎯"
  },
  "10": {
    "title": "HTTPS and Secure Communications",
    "content": "HTTPS encrypts data between your browser and websites using SSL/TLS protocols. This prevents eavesdropping and ensures data integrity during transmission.",
    "keyPoints": [
      "Always check for HTTPS on sensitive sites",
      "Avoid public Wi-Fi for sensitive activities",
      "Use VPN for additional protection",
      "Keep browsers updated for latest security features"
    ],
    "icon": "🔗"
  },
  "11": {
    "title": "Social Engineering Attacks",
    "content": "Social engineering exploits human psychology rather than technical vulnerabilities. Attackers manipulate people into revealing confidential information or performing actions that compromise security.",
    "keyPoints": [
      "Be skeptical of unsolicited requests",
      "Verify identity through independent channels",
      "Train employees on common tactics",
      "Implement verification procedures"
    ],
    "icon": "🧠"
  },
  "12": {
    "title": "Malware: Viruses vs Worms",
    "content": "Understanding the difference between viruses and worms helps in choosing appropriate protection. Viruses need host files to spread, while worms can replicate and spread independently across networks.",
    "keyPoints": [
      "Viruses: Attach to files, need user action to spread",
      "Worms: Self-replicate across networks automatically",
      "Both can cause significant damage",
      "Use updated antivirus and network monitoring"
    ],
    "icon": "🦠"
  }
};