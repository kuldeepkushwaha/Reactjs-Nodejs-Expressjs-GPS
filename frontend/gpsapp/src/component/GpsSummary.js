import React, { useEffect, useState } from "react";
import "../css/GpsSummary.css"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Logout, reset } from "../features/authSlice";
const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);
  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const GpsSummaryTable = (props) => {
  const { items, requestSort } = useSortableData(props.products);

  return (
    <table className="table-main">
      <thead>
        <tr className="tr-underdline">
          <th className="th-gs">Device Id<button className="sort-button fa fa-fw fa-sort " onClick={() => requestSort('DeviceId')} /></th>
          <th className="th-gs">Device Type<button className="sort-button fa fa-fw fa-sort " onClick={() => requestSort('DeviceType')} /></th>
          <th className="th-gs">Latest Timestamp<button className="sort-button fa fa-fw fa-sort" onClick={() => requestSort('Timestamp')} /></th>
          <th className="th-gs">Lateset location<button className="sort-button fa fa-fw fa-sort" onClick={() => requestSort('location')} /></th>
          <th className="th-gs"></th>
        </tr>
      </thead>
      <tbody>{
        items.filter((row) =>
          // note that I've incorporated the searchedVal length check here
          !props.searchKey.length > 0 || row.DeviceId.toString().toLowerCase().includes(props.searchKey.toString().toLowerCase()) || row.DeviceType.toString().toLowerCase().includes(props.searchKey.toString().toLowerCase())
        )
          .map((item, index) => (
            <tr className="tr-underdline" key={index + 1}>
              <td className="td-gs">{item.DeviceId}</td>
              <td className="td-gs">{item.DeviceType}</td>
              <td className="td-gs">{item.Timestamp}</td>
              <td className="td-gs">{item.location}</td>
              <td><Link to={`/gpsdetail/${item.DeviceId}`} ><span className="fa fa-arrow-right"></span></Link></td>
            </tr>
          ))}
      </tbody></table>
  );
};
export default function GpsSummary() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state => state.auth));
  const [GpsData, setGpsData] = useState([]);
  const [number, setNumber] = useState(1); // No of pages
  const [postPerPage] = useState(5);
  const [searchedVal, setSearchedVal] = useState("");
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  useEffect(() => {
    if (isError) {
    navigate("/");
    }
  }, [isError, navigate]);
  useEffect(() => {
    getData();
  },[]);
  const logout = () => {
    dispatch(Logout());
    dispatch(reset());
    navigate('/');
  }
  const getData = async () => {
    const response = await axios.get("http://localhost:5000/getGpsData");
    setGpsData(response.data.response);
  }
  const [searchIcon] = useState("fa fa-search i-search");

  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(GpsData.length / postPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <>
      <div className="logout" onClick={logout}>Logout</div>
      <div className="container-gpssummary">
        <h3 className="title-label m-2">GPS Summary</h3>
        <div className="div-search">
          <div className="search-wrapper">
            <input type="search" onChange={(e) => setSearchedVal(e.target.value)} placeholder="Search by Device ID/ Type" />
            <i className={searchIcon} aria-hidden="true" />
          </div>
          <div className="control-prev-next">
            <label className="page">{number + " of " + pageNumber.length}</label>
            <button className="prev " disabled={number === 1} onClick={() => setNumber(number - 1)} />
            <button className="next" disabled={number === pageNumber.length} onClick={() => setNumber(number + 1)} />
          </div>
        </div>
        <div className="table-container">
          <GpsSummaryTable
            searchKey={searchedVal}
            products={
              GpsData.slice(firstPost, lastPost)
            }
          />
        </div>
      </div>
    </>
  );
}