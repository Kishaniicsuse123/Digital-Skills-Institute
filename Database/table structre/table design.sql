
IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_Web_TableCreate')
BEGIN
    DROP PROCEDURE usp_Web_TableCreate
	DROP TABLE Courses
END
GO

Create Procedure usp_Web_TableCreate		
AS
BEGIN
CREATE TABLE Courses
(
    ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,  Name NVARCHAR(200), Fees DECIMAL(10,2), Description NVARCHAR(MAX),
    Image NVARCHAR(MAX), Duration NVARCHAR(50), Eligibility NVARCHAR(200), [Mode] NVARCHAR(50), [Language] NVARCHAR(50),
    Certification BIT, PlacementSupport BIT, Internship BIT, [Level] NVARCHAR(50), Rating DECIMAL(2,1),
    Students INT, CreatedDate DATETIME, ModifyDate DATETIME
);
END
GO

ALTER TABLE Courses
ADD Semester int

ALTER TABLE Courses
ADD SortDesc NVARCHAR(Max)


CREATE TABLE CourseSubjects
(
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    CourseId UNIQUEIDENTIFIER,
    SubjectName NVARCHAR(200),

    FOREIGN KEY (CourseId)
    REFERENCES Courses(Id)
)

CREATE TABLE CareerOpportunities
(
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    CourseId UNIQUEIDENTIFIER,
    CareerName NVARCHAR(200),

    FOREIGN KEY (CourseId)
    REFERENCES Courses(Id)
)

CREATE TABLE CourseRequirements
(
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    CourseId UNIQUEIDENTIFIER,
    RequirementName NVARCHAR(300),

    FOREIGN KEY (CourseId)
    REFERENCES Courses(Id)
)

CREATE TABLE CourseProjects
(
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    CourseId UNIQUEIDENTIFIER,
    ProjectName NVARCHAR(200),
    ProjectDescription NVARCHAR(MAX),

    FOREIGN KEY (CourseId)
    REFERENCES Courses(Id)
)

CREATE TABLE Trainers
(
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    CourseId UNIQUEIDENTIFIER,
    TrainerName NVARCHAR(100),
    Experience NVARCHAR(100),
    Specialization NVARCHAR(200),
    TrainerImage NVARCHAR(MAX),

    FOREIGN KEY (CourseId)
    REFERENCES Courses(Id)
)

CREATE TABLE CourseFAQ
(
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    CourseId UNIQUEIDENTIFIER,
    Question NVARCHAR(MAX),
    Answer NVARCHAR(MAX),

    FOREIGN KEY (CourseId)
    REFERENCES Courses(Id)
)


IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_Web_CreateTableCourseRegistration')
BEGIN
    DROP PROCEDURE [dbo].[usp_Web_CreateTableCourseRegistration]
	DROP TABLE CourseRegistration
END
GO

Create Procedure [dbo].[usp_Web_CreateTableCourseRegistration]
AS
BEGIN
		CREATE TABLE CourseRegistration
		(
			RegistrationId INT IDENTITY(1,1) PRIMARY KEY,
			 -- Personal Details
		    FullName NVARCHAR(100) NOT NULL,
		    FatherMotherName NVARCHAR(100) NULL,
		    Gender NVARCHAR(10) NULL,
		    DateOfBirth DATE NULL,
		    ProfilePhoto VARBINARY(MAX) NULL,
		
		    -- Contact Details
		    MobileNumber VARCHAR(15) NOT NULL,
		    AlternateMobileNumber VARCHAR(15) NULL,
		    EmailAddress NVARCHAR(100) NOT NULL,
		    AddressLine NVARCHAR(255) NULL,
		    City NVARCHAR(50) NULL,
		    State NVARCHAR(50) NULL,
		    Pincode VARCHAR(10) NULL,
		
		    -- Course Details
		    CourseName NVARCHAR(100) NOT NULL,
		    CourseMode NVARCHAR(20) NULL,      -- Online / Offline / Hybrid
		    CourseDuration NVARCHAR(50) NULL,  -- 3 Months, 6 Months etc.
		    BatchTiming NVARCHAR(50) NULL,
		    PreferredStartDate DATE NULL,
		
		    -- Educational Details
		    HighestQualification NVARCHAR(100) NULL,
		    CollegeUniversityName NVARCHAR(200) NULL,
		    PassingYear INT NULL,
		    PercentageCGPA DECIMAL(5,2) NULL,
		
		    -- System Fields
		    RegistrationDate DATETIME DEFAULT GETDATE() 
		);
END
GO


IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_Web_TableCreateEmployee')
BEGIN
    DROP PROCEDURE usp_Web_TableCreateEmployee
	DROP TABLE Employee
END
GO

Create Procedure usp_Web_TableCreateEmployee		
AS
BEGIN
		CREATE TABLE Employee
		(
		    EmployeeID INT IDENTITY(1,1) PRIMARY KEY,
		    EmployeeCode NVARCHAR(20) UNIQUE,
		    FullName NVARCHAR(200) NOT NULL,
		    Gender NVARCHAR(10),
		    DateOfBirth DATE,
		    MobileNo NVARCHAR(15) NOT NULL,
		    Email NVARCHAR(100) UNIQUE NOT NULL,
		    Address NVARCHAR(500),
		    City NVARCHAR(100),
		    State NVARCHAR(100),
		    Pincode NVARCHAR(10),
		    DepartmentID INT,
		    JoiningDate DATE,
		    Salary DECIMAL(18,2),
		    ManagerID INT,
		    Status NVARCHAR(20) DEFAULT 'Active',
		    ProfilePhoto VARBINARY(MAX),
		    AadhaarNo NVARCHAR(20),
		    PANNo NVARCHAR(20),
		    BankAccountNo NVARCHAR(50),
		    IFSCCode NVARCHAR(20),
		    CreatedDate DATETIME DEFAULT GETDATE(),
		    UpdatedDate DATETIME NULL
		);
END
GO