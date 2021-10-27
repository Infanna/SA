package entity

import (
	"time"
	"gorm.io/gorm"
)

type Role struct {
	gorm.Model
	Name	string

	User	[]User	`gorm:"foreignKey:RoleID"`
}

type User struct {
	gorm.Model
	Name	   string	
	UserName   string	`gorm:"uniqueIndex"`
	Password   string

	Patients	[]Patient	`gorm:"foreignKey:UserID"`

	RoleID		*uint
	Role		Role

}

type Job struct {
	gorm.Model
	Name string

	Patients	[]Patient	`gorm:"foreignKey:JobID"`
}

type Insurance struct {
	gorm.Model
	Name string
	Detail string

	Patients	[]Patient 	`gorm:"foreignKey:InsuranceID"`
}

type Sex struct {
	gorm.Model
	Name string

	Patients	[]Patient 	`gorm:"foreignKey:SexID"`
}

type Patient struct {
	gorm.Model		
	Firstname	string
	Lastname		string
	Age			int
	IDcard		string 	 `gorm:"uniqueIndex"`
	Tel			string
	Time 		time.Time

	UserID				*uint
	User				User

	JobID				*uint
	Job					Job

	InsuranceID			*uint
	Insurance			Insurance

	SexID				*uint
	Sex					Sex

}