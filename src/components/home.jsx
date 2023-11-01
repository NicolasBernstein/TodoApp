import { useState, useEffect } from "react";
import { CheckSession, ReadData } from './DatabaseReqs';
import { Createtodo } from "./DatabaseReqs";
import { Deletetodo } from "./DatabaseReqs";
import { Updatetodo } from "./DatabaseReqs";
import Deletesvg from '../images/erase.svg';
import { useNavigate } from "react-router-dom";
export default function Home() {
    const navigate = useNavigate();
    const [GetList, SetList] = useState([]);
    const [GetOpenedList, SetOpenedList] = useState({ "id": "", "title": "", "description": "", "category": "" });
    const [FilteredData, SetFilteredData] = useState({});
    const [PageData, SetPageData] = useState([]);

    const [IsOpen, SetIsOpen] = useState(false);
    const [OpenCreate, SetOpenCreate] = useState(false);
    const [Page, SetPage] = useState(1);

    const [Data, SetData] = useState({ "title": "", "description": "", "category": "" });
    const [GetCategory, SetCategory] = useState([]);
    const [CurrentCategory, SetCurrentCategory] = useState('All');
    function OpenList(op, list) {
        if (op == false) {
            SetIsOpen(false);
        } else {
            SetOpenedList(list);
            SetIsOpen(true);
            SetOpenCreate(false);
        }
    }

    function OpenCr(op) {
        SetOpenCreate(op);
        if (op == true) {
            SetIsOpen(false);

        }
    }

    function checkbox(list) {
        list.done = !list.done;
        Updatetodo(list).then(data => {
            console.log(data);
            Read();

        })


    }

    function elipsis(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        } else {
            return text;
        }
    }
    async function Create() {
        try {
            const data = await Createtodo(Data.title, Data.description, Data.category);
            console.log(data);
            Read();
        } catch (error) {
            console.error(error.response.data);
        }
    }
    async function Read() {
        try {
            var data = await ReadData();
            const AdjustData = data.map(item => ({ ...item, done: item.done !== 0 }));
            SetList(AdjustData);
            categoryfilter();
        } catch (error) {
            console.error(error.response.data);
        }
    }
    function Update(list) {
        Updatetodo(list)
            .then(data => {
                console.log(data);
                Read();

            })
            .catch(error => {
                console.error("Error updating your todo", error);
            });
    }
    async function Delete(id) {
        try {
            const data = await Deletetodo(id);
            console.log(data);
            if (GetList.length === 1) {
                SetList([]);
                SetFilteredData([]);
                SetPageData([]);

            } else {
                Read();
            }
        } catch (error) {
            console.error(error.response.data);
        }
    }
    useEffect(() => {
        CheckSession()
            .then(data => {
                console.log(data);
                if (data === "Logged in") {
                    Read();
                } else {
                    navigate('/Login');
                    window.location.reload();
                    return;
                }
            })
            .catch(error => {
                console.error("Error verifying your session", error);
            });
    }, [])
    function categoryfilter() {
        const Categories = [...new Set(GetList.map((list) => list.category))];
        SetCategory(Categories);
        console.log(Categories);
    }
    useEffect(() => {
        categoryfilter();

    }, [GetList, FilteredData, PageData])

    useEffect(() => {
        SetFilteredData(GetList.filter(list => CurrentCategory === 'All' || list.category === CurrentCategory));
    }, [CurrentCategory, GetList]);
    function ArrowChange(val) {
        if (val == "Left") {
            SetPage(Page - 1);
        } else {
            SetPage(Page + 1);
        }
    }
    useEffect(() => {
        const startIndex = (Page - 1) * 14;
        const endIndex = startIndex + 14;
        if (FilteredData.length > 0) {
            SetPageData(FilteredData.slice(startIndex, endIndex));

        }
        if (Page < 1) {
            SetPage(1);
        }
    }, [FilteredData, Page]);

    return (<div id="content">
        <h1 className="text-white text-center">Your todo list</h1>
        <h5 htmlFor="Category" id="category" className="text-white">Filter by category:
            <select id="CategoryFilter" value={CurrentCategory} onChange={ev => SetCurrentCategory(ev.target.value)}>
                <option value={"All"}>All</option>
                {GetCategory.length > 0 && GetCategory.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </h5>
        <div id="yourtodos">
            <div className="d-flex flex-row justify-content-between" id="details">
                <div className="detaildiv h3">Title</div>
                <div className="detaildiv h3">Description</div>
                <div className="detaildiv h3">Category</div>
                <div className="detaildiv h3"></div>
            </div>
            <div id="todos">
                {PageData.length > 0 && PageData.map((list) => (
                    <div id={list.id} className="d-flex flex-row justify-content-between list">
                        <div className="detailist h3" >{list.title}<input
                            className={`check ${list.done ? "true" : "false"}`}
                            onClick={() => checkbox(list)}
                            checked={list.done}
                            type="checkbox"
                        /></div>
                        <div className="detailist h3" >{elipsis(list.description, 15)}</div>
                        <div className="detailist h3" >{list.category}</div>
                        <div className="detailist h3 opendiv"> <button className=" h4 open" onClick={(ev) => OpenList("open", list)}>Open </button> <img src={Deletesvg} className=" h4 delete" onClick={ev => Delete(list.id)}></img> </div>
                    </div>

                )
                )}
            </div>

        </div>
        <div id="page" className="d-flex flex-row">
            <div className="arrowbuttons text-white h4" id="leftarrow" onClick={ev => ArrowChange("Left")}> {'<'}   </div>
            <input className="inputcustomer" type="number" value={Page}></input>
            <div className="arrowbuttons text-white h4" id="rightarrow" onClick={ev => ArrowChange("Right")} > {'>'} </div>

        </div>

        <button className="h2" id="create" onClick={ev => OpenCr(!OpenCreate)}>CREATE</button>
        <div id="selectedtask" className={`d-flex flex-column ${IsOpen ? "visible" : "hidden"}`}>
            <button id="back" onClick={(ev) => OpenList(false)}>X</button>
            <div className="text-white h5 m-1 editdetails" style={{ paddingTop: '3' + '%' }}>Title: <input value={GetOpenedList.title} onChange={(e) => SetOpenedList({ ...GetOpenedList, title: e.target.value })}></input></div>
            <div className="text-white h5 m-1 editdetails">Description: <textarea value={GetOpenedList.description} onChange={(e) => SetOpenedList({ ...GetOpenedList, description: e.target.value })}></textarea></div>
            <div className="text-white h5 m-1 editdetails">Category: <input value={GetOpenedList.category} onChange={(e) => SetOpenedList({ ...GetOpenedList, category: e.target.value })}></input></div>
            <button className="h3" id="savedit" onClick={ev => Update(GetOpenedList)}>SAVE</button>



        </div>
        <div className={`d-flex flex-column ${OpenCreate ? "visible" : "hidden"}`} id="createnewtask">
            <button id="back" onClick={(ev) => OpenCr(false)}>X</button>
            <div className="h3" id="createtitle">Create new item</div>
            <div id="inputscontainer">
                <div className="text-white h5 m-1 editdetails" >Title: <input onChange={(e) => SetData({ ...Data, title: e.target.value })} ></input></div>
                <div className="text-white h5 m-1 editdetails" >Description: <input onChange={(e) => SetData({ ...Data, description: e.target.value })}></input></div>
                <div className="text-white h5 m-1 editdetails" >Category: <input onChange={(e) => SetData({ ...Data, category: e.target.value })}></input></div>
            </div>
            <button className="h3" id="savedit" onClick={ev => Create()}>SAVE</button>
        </div>

    </div >



    )
}