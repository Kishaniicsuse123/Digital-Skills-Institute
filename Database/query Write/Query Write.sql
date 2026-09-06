
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

EXEC usp_Web_GetCourseRegistrationList

