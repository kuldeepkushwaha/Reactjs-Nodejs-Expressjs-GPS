import { Sequelize } from "sequelize"
import db from "../config/Database.js"
const { DataTypes } = Sequelize;
const Users = db.define('users',{
      name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
             notEmpty: true,
             len:[3,100]

        }},
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate:{
                 notEmpty: true,
                 isEmail:true
    
            }
        },
            password:{
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                     notEmpty: true,
                     len: [7,100]
                }
      }
},


{
        freezeTableName: true
    

});
export default Users;