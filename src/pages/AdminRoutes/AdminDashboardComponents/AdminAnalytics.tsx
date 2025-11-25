/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts"
import { useState } from "react"
import { useGetAdminReportQuery } from "@/redux/features/stats/stats.api"
import { BounceLoader } from "react-spinners"
import DashBoardBreadcrumb from "@/components/layouts/layout-items/DashBoardBreadCrumb"
import featureImg from "@/assets/images/features.jpg";

export default function AdminAnalytics() {
    const { data, isLoading } = useGetAdminReportQuery(undefined, { pollingInterval: 5000 })
    const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily")


    if (isLoading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <BounceLoader color="#f97316" size={80} />
            </div>
        );
    }

    console.log(data)

    const report = data.data || {
        totalRiders: 0,
        totalDrivers: 0,
        totalCompletedRides: 0,
        totalCancelledRides: 0,
        totalDriverIncome: 0,
        totalEarnings: 0,
        ridesDaily: [],
        ridesWeekly: [],
        ridesMonthly: [],
    }

    const getChartData = () => {
        let rawData: any[] = []
        if (period === "daily") rawData = report.ridesDaily
        if (period === "weekly") {
            rawData = report.ridesWeekly.map(
                (d: { _id: { year: any; week: any } }) => ({
                    ...d,
                    _id: `${d._id.year}-W${d._id.week}`,
                })
            )
        }
        if (period === "monthly") rawData = report.ridesMonthly
        return rawData
    }

    return (
        <>
            <section className="min-h-screen p-2 sm:p-6 md:p-8 flex flex-col gap-6">

                <DashBoardBreadcrumb
                    title="Admin Analytics"
                    description="Analyze overall platform activity, including rides, earnings, and user engagement."
                    backgroundImage={featureImg}
                />


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="bg-indigo-500 text-white shadow-lg rounded-none">
                        <CardContent>
                            <h2 className="text-sm sm:text-base opacity-80">Total Riders</h2>
                            <p className="text-xl sm:text-2xl md:text-3xl font-bold">{report.totalRiders}</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-pink-500 text-white shadow-lg rounded-none">
                        <CardContent>
                            <h2 className="text-sm sm:text-base opacity-80">Total Drivers</h2>
                            <p className="text-xl sm:text-2xl md:text-3xl font-bold">{report.totalDrivers}</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-green-500 text-white shadow-lg rounded-none">
                        <CardContent>
                            <h2 className="text-sm sm:text-base opacity-80">Completed Rides</h2>
                            <p className="text-xl sm:text-2xl md:text-3xl font-bold">{report.totalCompletedRides}</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-red-500 text-white shadow-lg rounded-none">
                        <CardContent>
                            <h2 className="text-sm sm:text-base opacity-80">Cancelled Rides</h2>
                            <p className="text-xl sm:text-2xl md:text-3xl font-bold">{report.totalCancelledRides}</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-blue-500 text-white shadow-lg rounded-none">
                        <CardContent>
                            <h2 className="text-sm sm:text-base opacity-80">Total Fare Money</h2>
                            <p className="text-xl sm:text-2xl md:text-3xl font-bold">${report.totalFareMoney}</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-purple-500 text-white shadow-lg rounded-none">
                        <CardContent>
                            <h2 className="text-sm sm:text-base opacity-80">Owner Earnings</h2>
                            <p className="text-xl sm:text-2xl md:text-3xl font-bold">${report.totalEarnings}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Period Switch */}
                <div className="flex gap-2">
                    {["daily", "weekly", "monthly"].map(p => (
                        <button
                            key={p}
                            className={`px-4 py-2 rounded-none font-semibold text-xs ${period === p
                                ? "bg-primary text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                            onClick={() => setPeriod(p as "daily" | "weekly" | "monthly")}
                        >
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Line Chart */}
                <Card className="shadow-lg rounded-none p-0 bg-background">
                    <CardContent className="px-2">
                        <div className="flex justify-center items-center">
                            <h2 className="text-lg font-semibold mb-4 mt-4 uppercase">
                                {period.charAt(0).toUpperCase() + period.slice(1)} Rides Overview
                            </h2>
                        </div>
                        <div className="w-full h-64 mb-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={getChartData()}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="_id" />
                                    <YAxis />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "var(--background)", borderRadius: "4px" }}
                                        itemStyle={{ color: "#fff" }}
                                    />
                                    <Line type="monotone" dataKey="totalRides" stroke="#4f46e5" strokeWidth={2} />
                                    <Line type="monotone" dataKey="totalDriverIncome" stroke="#f59e0b" strokeWidth={2} />
                                    <Line type="monotone" dataKey="totalIncome" stroke="#10b981" strokeWidth={2} />
                                    <Line type="monotone" dataKey="totalEarnings" stroke="#9333ea" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </>
    )
}
