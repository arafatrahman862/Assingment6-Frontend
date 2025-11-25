/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Timeline,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";

interface TimelineProps {
  ride: any; 
}

export default function RideTimeline({ ride }: TimelineProps) {
  const timelineItems = [
    { id: 1, status: "REQUESTED", title: "Requested" },
    { id: 2, status: "ACCEPTED", title: "Accepted" },
    { id: 3, status: "PICKED_UP", title: "Picked Up" },
    { id: 4, status: "IN_TRANSIT", title: "In Transit" },
    { id: 5, status: "ARRIVED", title: "Arrived" },
    { id: 6, status: "COMPLETED", title: "Completed" },
  ];

  const currentStepIndex = timelineItems.findIndex(item => item.status === ride.rideStatus);

  return (
    <div className="w-full overflow-x-auto">
      <Timeline value={currentStepIndex + 1} orientation="vertical" className="w-full">
        {timelineItems.map((item) => (
          <TimelineItem key={item.id} step={item.id}>
            <TimelineHeader>
              <TimelineSeparator />
              <TimelineTitle>{item.title}</TimelineTitle>
              <TimelineIndicator />
            </TimelineHeader>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
