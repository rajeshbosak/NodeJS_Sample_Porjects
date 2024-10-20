const mysql = require('mysql2');
const faker = require('faker');

// Create a MySQL connection
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'oasis_db'
});

// Open the MySQL connection
connection.connect(err => {
	if (err) throw err;
	console.log('Connected to MySQL');
});

// Data for enums
const genders = ['Male', 'Female', 'Other'];
const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
const educationLevels = ['High School', 'Bachelor', 'Master', 'PhD'];
const hobbies = ['Cycling', 'Reading', 'Photography', 'Running', 'Gaming', 'Painting', 'Hiking', 'Gardening', 'Traveling', 'Yoga'];

// Generate and insert 100 rows of data
for (let i = 0; i < 100; i++) {
	const firstName = faker.name.firstName();
	const lastName = faker.name.lastName();
	const dateOfBirth = faker.date.between('1940-01-01', '2005-12-31');
	const gender = faker.random.arrayElement(genders);
	const email = faker.internet.email();
	const phoneNumber = faker.phone.phoneNumber();
	const address = faker.address.streetAddress();
	const city = faker.address.city();
	const state = faker.address.state();
	const country = 'USA';
	const postalCode = faker.address.zipCode();
	const occupation = faker.name.jobTitle();
	const company = faker.company.companyName();
	const annualIncome = faker.finance.amount(30000, 150000, 2);
	const maritalStatus = faker.random.arrayElement(maritalStatuses);
	const numberOfChildren = faker.random.number({ min: 0, max: 5 });
	const educationLevel = faker.random.arrayElement(educationLevels);
	const hobby = faker.random.arrayElement(hobbies);

	const query = `
    INSERT INTO person (
      first_name, last_name, date_of_birth, gender, email, phone_number, address, city, state, country, postal_code,
      occupation, company, annual_income, marital_status, number_of_children, education_level, hobby
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

	connection.query(query, [
		firstName, lastName, dateOfBirth, gender, email, phoneNumber, address, city, state, country, postalCode,
		occupation, company, annualIncome, maritalStatus, numberOfChildren, educationLevel, hobby
	], (err, result) => {
		if (err) throw err;
		console.log(`Inserted row with ID: ${result.insertId}`);
	});
}

// Close the MySQL connection after inserting data
setTimeout(() => {
	connection.end();
	console.log('MySQL connection closed');
}, 5000);
