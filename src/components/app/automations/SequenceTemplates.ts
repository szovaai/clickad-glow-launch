interface Template {
  name: string;
  triggerEvent: string;
  steps: { type: "sms" | "email"; body: string; subject?: string; delayHours: number }[];
}

export const sequenceTemplates: Template[] = [
  {
    name: "New Lead Follow-Up",
    triggerEvent: "new_lead",
    steps: [
      { type: "sms", body: "Hi {{name}}, thanks for your inquiry! We'd love to help. When's a good time to chat?", delayHours: 0 },
      { type: "sms", body: "Hey {{name}}, just checking in — did you still need help with your project? We have availability this week.", delayHours: 24 },
      { type: "sms", body: "Hi {{name}}, last follow-up! If you're still interested, reply and we'll get you booked in. Otherwise, no worries!", delayHours: 72 },
    ],
  },
  {
    name: "Missed Call Recovery",
    triggerEvent: "missed_call",
    steps: [
      { type: "sms", body: "Sorry we missed your call, {{name}}! Click here to book a callback: [Link]", delayHours: 0 },
      { type: "sms", body: "Hi {{name}}, we tried reaching you earlier. Would you like to schedule a call? Reply with a good time!", delayHours: 24 },
    ],
  },
  {
    name: "No-Show Reminder",
    triggerEvent: "no_show",
    steps: [
      { type: "sms", body: "Hi {{name}}, we missed you at your appointment today! Would you like to reschedule?", delayHours: 1 },
      { type: "sms", body: "Hey {{name}}, just following up on your missed appointment. We still have availability — reply to rebook!", delayHours: 48 },
    ],
  },
  {
    name: "Quote Follow-Up",
    triggerEvent: "quote_sent",
    steps: [
      { type: "sms", body: "Hi {{name}}, just checking if you had any questions about the quote we sent?", delayHours: 48 },
      { type: "email", subject: "Your Quote Follow-Up", body: "Hi {{name}},\n\nJust following up on the quote we sent. Happy to answer any questions or adjust the scope.\n\nBest regards", delayHours: 120 },
    ],
  },
  {
    name: "30-Day Reactivation",
    triggerEvent: "reactivation",
    steps: [
      { type: "sms", body: "Hi {{name}}, it's been a while! We have some new availability and special offers. Interested in booking?", delayHours: 0 },
    ],
  },
];
