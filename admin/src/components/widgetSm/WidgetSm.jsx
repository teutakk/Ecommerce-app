import { useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";

export default function WidgetSm() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/?new=true")
        setUsers(res.data)
      } catch {}
    }
    getUsers()

  }, [])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => {
          return(
              <li className="widgetSmListItem" key={user._id}>
              <img
                src={user.img || "https://www.pngarts.com/files/3/Girl-Avatar-Download-Transparent-PNG-Image.png"}
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.username}</span>
              </div>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  );
}
