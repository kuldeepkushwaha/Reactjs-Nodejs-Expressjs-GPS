import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import '../css/GpsDetail.css';
import { Chart } from "react-google-charts";
import axios from "axios";
import { getMe } from "../features/authSlice";
export const options = {
    title: "% Time spent on each location",
};

export default function GpsDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state => state.auth));
    const { id } = useParams();
    const [deviceType, setDeviceType] = useState("");
    const [dataChart, setdataChart] = useState([])
    const [GpsData, setGpsData] = useState([]);
    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);
    useEffect(() => {
        if (isError) {
           navigate("/");
        }
    }, [isError, navigate]);

    useEffect(() => {
        const getGpsDataById = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/getGpsDataById/${id}`,{ withCredentials: true });
                setDeviceType(res.data.response[0].DeviceType);
                setGpsData(res.data.response);
                const mp = new Map();
                res.data.response.map((item, index) => {

                    if (mp.has(item.location)) {
                        mp.set(item.location, mp.get(item.location) + 1);

                    }
                    else {
                        mp.set(item.location, 1);

                    }
                });
                let arr = [["location", "duration"]];
                mp.forEach((value, key) => {
                    let tmp = [key, value];
                    arr.push(tmp);
                })
                console.log(arr);
                setdataChart(arr)
            }
            catch (error) {
                if (error) {
                    console.log(error.res.data.msg);
                }
            }
        }
        getGpsDataById();
    }, [id]);


    return (
        <>
            <div className="container-main">

                <Link to={`/gpssummary`} className="back"><span className="fa fa-arrow-left spanback"></span></Link>
                <h2 className="title-label mx-3">{id}</h2>
                <h4 className="title-label mx-3">{deviceType}</h4>
                <div className="container-row">
                    <div className="container-detail">
                        <div>
                            <table className="table-main">
                                <thead>
                                    <tr><th className="th-gd">Timestamp</th>
                                        <th className="th-gd">Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        GpsData.map((item, index) => (
                                            <tr key={index + 1}>
                                                <td className="td-gd">{item.Timestamp}</td>
                                                <td className="td-gd">{item.location}</td>
                                            </tr>
                                        ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="my-pie-chart-container">


                        <Chart
                            className="pie"
                            chartType="PieChart"
                            data={dataChart}
                            options={options}
                            width="100%"
                            height="310px"
                            legendToggle
                        />
                    </div>
                </div>
            </div>

        </>
    );
}