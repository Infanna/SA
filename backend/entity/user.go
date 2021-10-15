package entity

import (
	"time"
	"gorm.io/gorm"
)

type Role struct {
	gorm.Model
	RoleName	string

	User	[]User	`gorm:"foreignKey:RoleID"`
}

type User struct {
	gorm.Model
	Name	   string	
	UserName   string	`gorm:"uniqueIndex"`
	Pass	   string

	Patients	[]Patient	`gorm:"foreignKey:UserID"`

	RoleID		*uint
	Role		Role

}

type Job struct {
	gorm.Model
	JobName string

	Patients	[]Patient	`gorm:"foreignKey:JobID"`
}

type Insurance struct {
	gorm.Model
	InsuranceName string
	Detail string

	Patients	[]Patient 	`gorm:"foreignKey:InsuranceID"`
}

type Sex struct {
	gorm.Model
	SexName string

	Patients	[]Patient 	`gorm:"foreignKey:SexID"`
}

type Patient struct {
	gorm.Model		
	PatientFirstname	string
	PatientLastname		string
	PatientAge			int
	PatientIDcard		string 	 `gorm:"uniqueIndex"`
	PatientTel			string
	PatientTime 		time.Time

	UserID				*uint
	User				User

	JobID				*uint
	Job					Job

	InsuranceID			*uint
	Insurance			Insurance

	SexID				*uint
	Sex					Sex

}