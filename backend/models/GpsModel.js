import { Sequelize } from "sequelize"
import db from "../config/Database.js"
const { DataTypes } = Sequelize;
const gpsdata = db.define('gpsdata',{
    DeviceId: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
             notEmpty: true
        }
      },
      DeviceType:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
             notEmpty: true

        }},
        Timestamp:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                 notEmpty: true
    
            }
        },
        location:{
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                     notEmpty: true
                }
      }
},


{
        freezeTableName: true
    

});
export default gpsdata;