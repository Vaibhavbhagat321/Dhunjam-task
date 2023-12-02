import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { BiRupee } from "react-icons/bi";

function Graph({ data, style }) {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={600}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis width={30} tick={false} stroke="#fff" />
          <Bar
            dataKey="requests"
            fill="#F0C3F1"
            barSize={40}
            legendType="none"
          />
        </BarChart>
      </ResponsiveContainer>
      <BiRupee className={style} />
    </>
  );
}

export default Graph;
