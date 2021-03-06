USE [LiftEmAll]
GO
/****** Object:  Table [dbo].[DriverRequest]    Script Date: 04/11/2016 10:34:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DriverRequest](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
	[Email] [nvarchar](50) NULL,
	[Phone] [nvarchar](50) NULL,
	[DriverName] [nvarchar](250) NULL,
	[PickUpLocation] [nvarchar](250) NULL,
	[DestinationLocation] [nvarchar](250) NULL,
	[IsDone] [bit] NOT NULL CONSTRAINT [DF_DriverRequest_IsDone]  DEFAULT ((0)),
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NULL,
 CONSTRAINT [PK_DriverRequest] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
