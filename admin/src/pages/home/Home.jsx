import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";

export default function Home() {
  const [userStats, setUserStats] = useState([])

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    []
  )

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats")
        res.data.map(item => {
          // console.log(item)
          setUserStats((prev) => [
            ...prev,
            {name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        })
        // console.log(res.data);
      } catch (error) {}
    }
    getStats()
  }, [MONTHS])

  // console.log(userStats);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
