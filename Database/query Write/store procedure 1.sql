 IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_Web_RenameTable')
BEGIN
    DROP PROCEDURE usp_Web_RenameTable
END
GO

Create Procedure usp_Web_RenameTable
AS 
BEGIN
	 EXEC sp_rename 'Coursesinfo', 'DegreeInfos';
END
GO

IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_Web_DgreeinfoDetails')
BEGIN
    DROP PROCEDURE usp_Web_DgreeinfoDetails
END
GO

Create Procedure usp_Web_DgreeinfoDetails
(
	@RecordID	INT = 0
)		
AS
BEGIN
		SELECT Id, Name, Image, Duration, Fees, Eligibility, Mode, Language, Certification,  PlacementSupport, Internship, Level, Rating, Students,
	    Semester AS TotalSemester, Description
		FROM courses (NOLOCK)
		WHERE Id = @RecordID 

END
GO

IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_Web_DgreeinfoDetailsFees')
BEGIN
    DROP PROCEDURE usp_Web_DgreeinfoDetailsFees
END
GO

CREATE PROCEDURE usp_Web_DgreeinfoDetailsFees
(
    @RecordID INT = 0
)		
AS
BEGIN
	  DECLARE @TotalFees DECIMAL(18,2);
	  DECLARE @Semester INT;
	  DECLARE @SemesterFees DECIMAL(18,2);
	  DECLARE @Count INT;
	  SET @Count = 1;
	  -- Get Fees and Semester
	  SELECT @TotalFees = Fees, @Semester = Semester FROM Courses (NOLOCK) WHERE Id = @RecordID;
	  -- Calculate Per Semester Fees
	  IF(@Semester > 0)
	  BEGIN
	    	SET @SemesterFees = @TotalFees / @Semester;
	  END
	  -- Temp Table
	  CREATE TABLE #SemesterDetails(SemesterName VARCHAR(20), SemesterFees DECIMAL(18,2))
	  -- Dynamic Semester Records
	  WHILE(@Count <= @Semester)
	  BEGIN
	  	   INSERT INTO #SemesterDetails(SemesterName, SemesterFees)
	  	   VALUES('Semester ' + CAST(@Count AS VARCHAR), @SemesterFees)
	  	   SET @Count = @Count + 1;
	  END
	  -- Final Result
	  SELECT SemesterName, SemesterFees FROM #SemesterDetails

	  UNION ALL

	 SELECT 'Total Fees' AS SemesterName, SUM(SemesterFees) AS SemesterFees FROM #SemesterDetails (NOLOCK);
END
GO

IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_Web_ShortTermCourseDetail')
BEGIN
    DROP PROCEDURE usp_Web_ShortTermCourseDetail
END
GO

Create Procedure usp_Web_ShortTermCourseDetail
(
	@RecordID	INT = 0
)		
AS
BEGIN
		SELECT Id, Coursename, Price, Longdescription, [Image], [Duration], [Level], [Language], [Certificate], Rating,
			   Students, [Status], Rating, Students
		FROM ShortTermCourse (NOLOCK)
		WHERE Id = @RecordID 

END
GO

IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_Web_SaveCourseRegistrationDetail')
BEGIN
    DROP PROCEDURE usp_Web_SaveCourseRegistrationDetail
END
GO

Create Procedure usp_Web_SaveCourseRegistrationDetail
(
		@RegistrationId			INT = 0,
		@FullName				NVARCHAR(200) = '',
		@FatherMotherName		NVARCHAR(200) = '',
		@Gender					NVARCHAR(20) = '',
		@DateOfBirth			DATE NULL	,
		@MobileNumber			VARCHAR	(15),
		@AlternateMobileNumber	VARCHAR	(15),
		@EmailAddress			NVARCHAR(200),
		@AddressLine			NVARCHAR(510),
		@City					NVARCHAR(100),
		@State					NVARCHAR(100),
		@Pincode				VARCHAR	(10),
		@CourseName				NVARCHAR(200),
		@CourseMode				NVARCHAR(40),
		@CourseDuration			NVARCHAR(100),
		@BatchTiming			NVARCHAR(100),
		@PreferredStartDate		DATE = NULL,
		@HighestQualification	NVARCHAR(200),
		@CollegeUniversityName	NVARCHAR(400),
		@PassingYear			INT		,
		@PercentageCGPA			DECIMAL(5,2) = 0,
		@ProfilePhoto			VARBINARY(MAX)
)		
AS
BEGIN
	DECLARE @ResultSet INT

	IF EXISTS(SELECT 1 FROM CourseRegistration (NOLOCK)WHERE RegistrationId = @RegistrationId)
	BEGIN
				UPDATE CourseRegistration
				SET FullName				= @FullName	,
					FatherMotherName		= @FatherMotherName,
					Gender					= @Gender,
					DateOfBirth			    = @DateOfBirth,
					MobileNumber			= @MobileNumber,
					AlternateMobileNumber	= @AlternateMobileNumber,
					EmailAddress			= @EmailAddress	,
					AddressLine			    = @AddressLine,
					City					= @City,
					State					= @State,
					Pincode				    = @Pincode,
					CourseName				= @CourseName,
					CourseMode				= @CourseMode,
					CourseDuration			= @CourseDuration,
					BatchTiming			    = @BatchTiming ,
					PreferredStartDate		= @PreferredStartDate,
					HighestQualification	= @HighestQualification	,
					CollegeUniversityName	= @CollegeUniversityName,
					PassingYear			    = @PassingYear,
					PercentageCGPA			= @PercentageCGPA,
					RegistrationDate		= GETDATE(),
					ProfilePhoto			= @ProfilePhoto 
			  WHERE RegistrationId = @RegistrationId

			 SET @ResultSet = 1;
	END
	
	ELSE
	BEGIN
		INSERT INTO CourseRegistration
					(
						 FullName, FatherMotherName, Gender, DateOfBirth, MobileNumber, AlternateMobileNumber, EmailAddress,
						AddressLine, City, State, Pincode, CourseName, CourseMode, CourseDuration, BatchTiming, PreferredStartDate,
						HighestQualification, CollegeUniversityName, PassingYear, PercentageCGPA, RegistrationDate, ProfilePhoto
					)
		VALUES
		(
				@FullName, @FatherMotherName, @Gender, @DateOfBirth, @MobileNumber, @AlternateMobileNumber, @EmailAddress,			
				@AddressLine, @City, @State, @Pincode, @CourseName, @CourseMode, @CourseDuration, @BatchTiming, @PreferredStartDate,
				@HighestQualification, @CollegeUniversityName, @PassingYear, @PercentageCGPA, GETDATE(), @ProfilePhoto			
		)
		SET @ResultSet = 1;

		SET @RegistrationId = SCOPE_IDENTITY();
	END

	SELECT @RegistrationId AS Id, @ResultSet STATUS
END
GO

IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_Web_GetCourseRegistrationList')
BEGIN
    DROP PROCEDURE usp_Web_GetCourseRegistrationList
END
GO

Create Procedure usp_Web_GetCourseRegistrationList
AS
BEGIN
	  DECLARE @ResultSet INT
	  
	  SELECT  RegistrationId, FullName, FatherMotherName, Gender, DateOfBirth, MobileNumber, AlternateMobileNumber, EmailAddress,
	  		  AddressLine, City, [State], Pincode, CourseName, CourseMode, CourseDuration, BatchTiming, PreferredStartDate,
	  	 	  HighestQualification, CollegeUniversityName, PassingYear, PercentageCGPA, RegistrationDate, ProfilePhoto
	  FROM CourseRegistration (NOLOCK)
END
GO

IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_Web_GetCourseRegistrationBasicDetail')
BEGIN
    DROP PROCEDURE usp_Web_GetCourseRegistrationBasicDetail
END
GO

Create Procedure usp_Web_GetCourseRegistrationBasicDetail
(
	@RegistrationId INT = 0
)
AS
BEGIN
	  DECLARE @ResultSet INT
	  
	  SELECT  RegistrationId, FullName, FatherMotherName, Gender, DateOfBirth, MobileNumber, AlternateMobileNumber, EmailAddress,
	  		  AddressLine, City, [State], Pincode, CourseName, CourseMode, CourseDuration, BatchTiming, PreferredStartDate,
	  	 	  HighestQualification, CollegeUniversityName, PassingYear, PercentageCGPA, RegistrationDate, ProfilePhoto
	  FROM CourseRegistration (NOLOCK)
	  WHERE RegistrationId = @RegistrationId 
END
GO

IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_Web_GetPersonalInfo')
BEGIN
    DROP PROCEDURE usp_Web_GetPersonalInfo
END
GO
Create Procedure usp_Web_GetPersonalInfo
(
	@RegistrationId INT = 0
)
AS
BEGIN
	  DECLARE @ResultSet INT;
	  
	  SELECT  RegistrationId, FullName, FatherMotherName, Gender, DateOfBirth, ProfilePhoto
	  FROM CourseRegistration (NOLOCK)
	  WHERE RegistrationId =1 @RegistrationId 
END
GO

select * from CourseRegistration

IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_Web_SavePersonalInfo')
BEGIN
    DROP PROCEDURE usp_Web_SavePersonalInfo
END
GO
Create Procedure usp_Web_SavePersonalInfo
(
	@RegistrationId		INT = 0,
	@FullName			NVARCHAR(200) ='',
	@FatherMotherName	NVARCHAR(200) ='',
	@Gender				NVARCHAR(20) = '',
	@DateOfBirth		DATE = NULL,
	@ProfilePhoto		VARBINARY(MAX)
)
AS
BEGIN
	 DECLARE @ResultSet INT;
	 
	 IF EXISTS(SELECT 1 FROM CourseRegistration WITH(NOLOCK) WHERE RegistrationId = @RegistrationId)
	 BEGIN
		  UPDATE CourseRegistration SET FullName = @FullName, FatherMotherName = @FatherMotherName, Gender = @Gender,
		 	    DateOfBirth = @DateOfBirth, ProfilePhoto = @ProfilePhoto, LastModifyDate = GETDATE()
	      WHERE RegistrationId = @RegistrationId 
		  
		  SET @ResultSet = 1
	 END
	 	SELECT @RegistrationId AS ID, @ResultSet STATUS  
END
GO

IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_Web_GetContactDetail')
BEGIN
    DROP PROCEDURE usp_Web_GetContactDetail
END
GO

Create Procedure usp_Web_GetContactDetail
(
	@RegistrationId INT = 0
)
AS
BEGIN
	  DECLARE @ResultSet INT
	  
	  SELECT  RegistrationId, MobileNumber, AlternateMobileNumber, EmailAddress, AddressLine, City, [State], Pincode, 'Noida' AS Destric
	  FROM CourseRegistration (NOLOCK)
	  WHERE RegistrationId = @RegistrationId 
END
GO

IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_Web_SaveContactDetail')
BEGIN
    DROP PROCEDURE usp_Web_SaveContactDetail
END
GO

Create Procedure usp_Web_SaveContactDetail
(
	@RegistrationId			 INT = 0,
	@MobileNumber			 VARCHAR(15) ='',
	@AlternateMobileNumber	 VARCHAR(15) ='',
	@EmailAddress			 NVARCHAR(200) = '',
	@AddressLine			 NVARCHAR(510) = '',
	@City					 NVARCHAR(100) = '',
	@State					 NVARCHAR(100) = '',
	@Pincode				 VARCHAR(10)='',
	@Destric				 NVARCHAR(100) = ''
)
AS
BEGIN
	 DECLARE @ResultSet INT;
	 
	 IF EXISTS(SELECT 1 FROM CourseRegistration WITH(NOLOCK) WHERE RegistrationId = @RegistrationId)
	 BEGIN
	       UPDATE CourseRegistration SET MobileNumber = @MobileNumber, AlternateMobileNumber = @AlternateMobileNumber,
		     	  EmailAddress = @EmailAddress, AddressLine = @AddressLine, City = @City, [State] = @State,
		     	  Pincode = @Pincode, Distric = @Destric, LastModifyDate = GETDATE()
	       WHERE RegistrationId = @RegistrationId 
		   SET @ResultSet =1
	 END

	 	SELECT @RegistrationId AS ID, @ResultSet STATUS 
END
GO

IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_Web_GetEductionDetails')
BEGIN
    DROP PROCEDURE usp_Web_GetEductionDetails
END
GO

Create Procedure usp_Web_GetEductionDetails
(
	@RegistrationId INT = 0
)
AS
BEGIN
	  DECLARE @ResultSet INT
	  
	  SELECT  RegistrationId, CourseName, CourseMode, CourseDuration, BatchTiming, PreferredStartDate,
	  	 	  HighestQualification, CollegeUniversityName, PassingYear, PercentageCGPA, RegistrationDate
	  FROM CourseRegistration (NOLOCK)
	  WHERE RegistrationId = @RegistrationId 
END
GO

IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_Web_SaveEductionDetails')
BEGIN
    DROP PROCEDURE usp_Web_SaveEductionDetails
END
GO
Create Procedure usp_Web_SaveEductionDetails
(
	@RegistrationId				INT = 0,
	@CourseName					NVARCHAR(100) ='',
	@CourseMode					NVARCHAR(20)  ='',
	@CourseDuration				NVARCHAR(100) ='',
	@BatchTiming				NVARCHAR(100) ='',
	@HighestQualification		NVARCHAR(200) ='',
	@CollegeUniversityName		NVARCHAR(200) ='',
	@PassingYear				INT = 0,
	@PercentageCGPA				DECIMAL(5,2) = 0
)
AS
BEGIN
	 DECLARE @ResultSet INT;
	 SET @ResultSet = 0;
	 
	 IF EXISTS(SELECT 1 FROM CourseRegistration WITH(NOLOCK) WHERE RegistrationId = @RegistrationId)
	 BEGIN
	      UPDATE CourseRegistration SET CourseName = @CourseName, CourseMode = @CourseMode, CourseDuration = @CourseDuration,
		    	 BatchTiming = @BatchTiming, HighestQualification  = @HighestQualification, CollegeUniversityName = @CollegeUniversityName,
		    	 PassingYear = @PassingYear, PercentageCGPA = @PercentageCGPA, RegistrationDate = GETDATE(), LastModifyDate = GETDATE()
	      WHERE RegistrationId = @RegistrationId 
		  
	      SET @ResultSet = 1
	END

		SELECT @RegistrationId AS ID, @ResultSet STATUS 
END
GO

IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_Web_GetEnquiryDetail')
BEGIN
    DROP PROCEDURE usp_Web_GetEnquiryDetail
END
GO

Create Procedure usp_Web_GetEnquiryDetail
AS
BEGIN
		SELECT ID, Email, CourseName, MobileNo, CreatedDate
		FROM [Enquiry] (NOLOCK) ORDER BY CreatedDate DESC
END
GO


IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_Web_SaveEmployee')
BEGIN
    DROP PROCEDURE usp_Web_SaveEmployee
END
GO

CREATE PROCEDURE usp_Web_SaveEmployee
(
      @EmployeeID      INT = 0,
      @Email           NVARCHAR(100)= '',
      @Password        NVARCHAR(50)	= '',
      @EmployeeCode    NVARCHAR(20)	= '',
      @FullName        NVARCHAR(200)= '',
      @Gender          NVARCHAR(10)	= '',
      @MobileNo        NVARCHAR(15)	= ''
)		
AS
BEGIN
		DECLARE @ResultSet INT
	
		IF EXISTS(SELECT 1 FROM Employee(NOLOCK) WHERE EmployeeID = @EmployeeID)
		BEGIN
				UPDATE Employee SET Email=@Email, Password=@Password, EmployeeCode=@EmployeeCode, FullName=@FullName, Gender=@Gender, MobileNo=@MobileNo , UpdatedDate = GETDATE()
				WHERE EmployeeID=@EmployeeID
				SET @ResultSet = 1
		END
		
		ELSE
		BEGIN
				INSERT INTO Employee (Email, Password, EmployeeCode, FullName, Gender, MobileNo)
				VALUES (@Email, @Password, @EmployeeCode, @FullName, @Gender, @MobileNo)

				SET @EmployeeID = SCOPE_IDENTITY()
				SET @ResultSet = 1
	   END
	  SELECT @EmployeeID AS Id, @ResultSet AS Status
END
GO

IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_Web_DeleteCourseRegistration')
BEGIN
     DROP PROCEDURE usp_Web_DeleteCourseRegistration
END
GO

Create Procedure usp_Web_DeleteCourseRegistration
( 
	@RegistrationId   INT = 0
)
AS
BEGIN
		DELETE FROM CourseRegistration WHERE RegistrationId = @RegistrationId
END
GO

EXEC usp_Web_DeleteCourseRegistration
@RegistrationId = 1
select * from CourseRegistration



select * from emplyee



IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_Web_GetEmplyeeList')
BEGIN
    DROP PROCEDURE usp_Web_GetEmplyeeList
END
GO

Create Procedure usp_Web_GetEmplyeeList
(
   @LoginEmpNo NVARCHAR(20)=''
)		
AS
BEGIN
		SELECT Id AS RecordID, Name, Email, mobile FROM Emplyee
END
GO

IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_Web_SaveEmplyee')
BEGIN
     DROP PROCEDURE usp_Web_SaveEmplyee
END
GO

Create Procedure usp_Web_SaveEmplyee
(
	@RecordID	INT = 0,
	@Name		NVARCHAR(30) ='',
	@Email		NVARCHAR(100)='',
	@Mobile		NVARCHAR(20)=''
)		
AS
BEGIN
	DECLARE @ResultSet INT

	IF EXISTS(SELECT 1 FROM Emplyee (NOLOCK)WHERE ID = @RecordID)
	BEGIN
		  UPDATE Emplyee SET Name = @Name, Email = @Email,  mobile = @Mobile WHERE ID = @RecordID 
		
	  	  SET @ResultSet = 1;
	END
	
	ELSE
	BEGIN
		  SET @ResultSet = 1;
		  
		  INSERT INTO Emplyee( Name, Email, mobile)
		  Values(@Name, @Email, @Mobile)
		  
		  SET @RecordID = SCOPE_IDENTITY();
	 END

	 SELECT @RecordID AS Id, @ResultSet STATUS
END
GO

IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_Web_DeleteEmplyee')
BEGIN
    DROP PROCEDURE usp_Web_DeleteEmplyee
END
GO

Create Procedure usp_Web_DeleteEmplyee
(
   @LoginEmpNo NVARCHAR(20)='',
   @RecordID	INT = 0
)		
AS
BEGIN
		DELETE FROM emplyee WHERE id = @RecordID
END
GO

