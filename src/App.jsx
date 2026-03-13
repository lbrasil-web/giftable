import { useState, useEffect, useRef } from "react";
import {
  Wallet, Megaphone, LayoutGrid, Gift, Zap, TrendingUp, Heart,
  CheckCircle, ArrowRight, Menu, X, Star, Users, Globe, Award,
  Clock, BookOpen, ChevronDown, Send, Building2, Mail, MessageSquare,
  User, Shield, Lock, FileCheck, KeyRound, Plus, Minus, Linkedin,
  Twitter, ChevronLeft
} from "lucide-react";

// ─── SCROLL ANIMATION HOOK ────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0px)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ─── LOGO ─────────────────────────────────────────────────────────────────────

function GiftableLogo({ height = 36, white = false }) {
  const scale = height / 52;
  const w = Math.round(200 * scale);
  const blue = white ? "#ffffff" : "#4F8EF7";
  const coral = white ? "#ffffff" : "#FF6B4A";
  return (
    <svg width={w} height={height} viewBox="0 0 200 52" xmlns="http://www.w3.org/2000/svg" fontFamily="'Inter','Helvetica Neue',Arial,sans-serif">
      <rect x="0" y="4" width="40" height="13" rx="4" fill={blue}/>
      <rect x="3" y="16" width="34" height="24" rx="3" fill={blue}/>
      <rect x="17" y="4" width="6" height="36" fill={coral}/>
      <rect x="0" y="11" width="40" height="6" fill={coral}/>
      <path d="M20 4 C20 -4 10 -6 10 -1 C10 2 15 4 20 4Z" fill={coral}/>
      <path d="M20 4 C20 -4 30 -6 30 -1 C30 2 25 4 20 4Z" fill={coral}/>
      <circle cx="20" cy="4" r="3" fill={coral}/>
      <text y="40" x="50" fontSize="30" fontWeight="700" letterSpacing="-1">
        <tspan fill={blue}>gift</tspan><tspan fill={coral}>able</tspan>
      </text>
    </svg>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const blogPosts = [
  {
    id: 1, title: "Why Employee Recognition Matters More Than Ever",
    excerpt: "In a world of remote work and hybrid teams, showing employees they matter has become the single most powerful tool for retention and culture.",
    author: "Giftable Team", date: "March 5, 2026", readTime: "5 min read", tag: "Culture",
    content: `The workplace has changed dramatically over the past few years. Remote work, hybrid schedules, and distributed teams have made it harder than ever to build the kind of organic culture that used to happen naturally in an office.

But one thing hasn't changed: people want to feel valued.

Research from Gallup consistently shows that employees who feel recognized are more engaged, more productive, and significantly less likely to leave their jobs. In fact, companies with strong recognition cultures see up to 31% lower voluntary turnover than those without.

**The Recognition Gap**

Despite the evidence, most companies still underinvest in recognition. A survey by SHRM found that nearly 80% of employees say they don't feel recognized enough at work. That's not a small gap — it's a crisis hiding in plain sight.

The irony is that recognition doesn't have to be expensive or complicated. The most effective forms of recognition are timely, specific, and personal. A well-timed gift card with a thoughtful note can do more for morale than an annual bonus that arrives without context.

**Why Digital Rewards Work**

Digital gift cards have emerged as the gold standard for employee recognition because they combine three things people actually want: choice, immediacy, and flexibility. Unlike company swag or generic Amazon orders, a digital reward lets the recipient decide what matters to them.

When someone receives a $50 gift card and gets to choose between their favorite coffee brand, a streaming service, or a restaurant they've been meaning to try — that's a fundamentally different experience than receiving something chosen for them.

**Building a Recognition Culture**

Recognition shouldn't be a once-a-year event. The companies with the strongest cultures treat appreciation as an ongoing practice, not a program. That means celebrating small wins, not just big ones. It means thanking people publicly and privately. And it means making it easy for managers to recognize their teams without jumping through HR hoops.

Tools like Giftable exist precisely to remove that friction. When sending a meaningful reward takes less than two minutes, managers actually do it — and that changes everything.

The bottom line: employee recognition isn't a nice-to-have anymore. In a competitive talent market, it's one of the most powerful levers a company has.`,
  },
  {
    id: 2, title: "The Psychology Behind Workplace Appreciation",
    excerpt: "Science confirms what great leaders already know: recognition activates intrinsic motivation and builds lasting loyalty across every team.",
    author: "Giftable Team", date: "February 12, 2026", readTime: "6 min read", tag: "Psychology",
    content: `Why does being recognized at work feel so good? The answer lies in some fundamental principles of human psychology — and understanding them can help companies build more effective appreciation programs.

**The Dopamine Effect**

When we receive recognition, our brains release dopamine — the same neurotransmitter associated with pleasure, motivation, and reward. This neurological response isn't superficial. It creates a real, measurable boost in energy, focus, and motivation that can last for days.

More importantly, the anticipation of recognition can be just as motivating as the recognition itself. Teams that know their work will be noticed tend to perform at higher levels consistently — not because they're chasing a reward, but because the social contract of appreciation creates psychological safety and engagement.

**Self-Determination Theory**

Psychologists Edward Deci and Richard Ryan developed Self-Determination Theory, which identifies three core human needs: autonomy, competence, and relatedness. Effective recognition addresses all three.

When a manager recognizes a specific contribution — "The way you handled that client situation showed real expertise" — they're affirming competence. When that recognition comes with a reward the employee chooses, it supports autonomy. And when it's delivered publicly or personally, it strengthens the bond of relatedness.

**The Timing Problem**

One of the most consistent findings in motivation research is that recognition loses its impact when delayed. A reward given three months after the behavior it's meant to reinforce has minimal effect on future behavior. The brain has long since moved on.

This is why annual bonuses, while financially meaningful, are poor motivators. The connection between the behavior and the reward is too distant to create the reinforcement loop that drives engagement.

Digital gift cards solve this problem elegantly. A manager can recognize great work the same day it happens — within minutes, in some cases. That immediacy is not just convenient; it's psychologically essential.

**Choice as Respect**

There's a subtle but powerful message embedded in giving someone a choice of reward: "I trust you to know what you want." That message of respect activates a sense of autonomy that amplifies the impact of the recognition itself.

When companies send generic gifts, they're inadvertently sending the opposite message: "We didn't take the time to understand you." Choice-based rewards flip that dynamic entirely.`,
  },
  {
    id: 3, title: "10 Creative Ways to Reward Your Employees",
    excerpt: "Beyond the annual bonus — here are ten thoughtful gestures that leave a lasting impression and make your team feel genuinely valued.",
    author: "Giftable Team", date: "January 20, 2026", readTime: "7 min read", tag: "Ideas",
    content: `Recognition doesn't have to be complicated or expensive to be effective. Here are ten approaches that actually work — whether you're a startup with a tight budget or an enterprise with thousands of employees.

**1. Spot Recognition with Digital Gift Cards**
The most effective recognition is timely and specific. When someone does something great, reward them within 24 hours with a digital gift card and a personal note explaining exactly what they did well. The combination of speed, specificity, and choice makes this remarkably powerful.

**2. Peer-to-Peer Recognition Programs**
Give employees a monthly budget to recognize each other. Peer recognition often feels more meaningful than top-down recognition because it comes from people who truly understand the day-to-day work. Tools like Giftable make this easy to administer at scale.

**3. Milestone Celebrations**
Work anniversaries, project completions, and personal milestones (promotions, certifications) deserve real acknowledgment. A personalized message from leadership plus a meaningful reward can turn a routine date into a memorable moment.

**4. The Surprise and Delight Approach**
Unexpected recognition hits differently. When an employee isn't expecting anything and receives a thoughtful gesture out of nowhere, the emotional impact is significantly higher than a scheduled recognition event.

**5. Team-Wide Celebration Campaigns**
When a team ships a product, closes a big deal, or hits a major goal, celebrate everyone — not just the people at the top. A campaign that lets every team member pick their own reward sends a powerful message about collective success.

**6. Birthday and Personal Milestone Recognition**
Remembering someone's birthday or work anniversary isn't just HR admin. It's a signal that the company sees them as a whole person, not just a resource. A simple digital gift card on these occasions goes a long way.

**7. Learning and Development Rewards**
Reward employees who complete certifications, finish courses, or develop new skills. This recognizes growth while reinforcing the message that the company invests in people who invest in themselves.

**8. Customer Shoutout Pass-Alongs**
When a customer compliments an employee by name, pass it along formally — with a reward attached. This closes a loop that most companies leave open and creates a powerful connection between customer impact and employee recognition.

**9. Values-Based Recognition**
Tie recognition explicitly to company values. "You showed real integrity in that situation" or "This is exactly what we mean when we talk about customer obsession" reinforces culture while making the recognition feel purposeful.

**10. Manager Appreciation Programs**
Don't forget to recognize managers. They're often the invisible layer that makes recognition cultures work — or fail. Giving managers tools and budget to recognize their teams, and then recognizing the managers who use them well, creates a virtuous cycle.`,
  },
  {
    id: 4, title: "How Digital Gift Cards Are Changing Corporate Rewards",
    excerpt: "Digital rewards have overtaken physical ones in speed, flexibility, and recipient satisfaction. Here's why every company is making the switch.",
    author: "Giftable Team", date: "December 9, 2025", readTime: "5 min read", tag: "Trends",
    content: `The corporate rewards industry has undergone a quiet revolution over the past decade. Physical gift cards, company swag, and catalog reward programs are rapidly being replaced by digital alternatives — and the reasons why are both practical and psychological.

**The Logistics Problem with Physical Rewards**

Anyone who has managed a corporate gifting program knows the pain: coordinating addresses, managing shipping timelines, dealing with international logistics, handling returns. For remote and distributed teams, the problem is magnified.

Digital gift cards eliminate all of this. A reward that would have taken two weeks to ship can now be delivered in two minutes, to any location in the world, with zero logistics overhead. For HR and operations teams, that's not a small improvement — it's a transformation.

**The Choice Revolution**

The most significant shift isn't logistical — it's philosophical. The old model assumed the company knew what employees wanted. The new model acknowledges that individuals have different preferences, and respects them enough to let them choose.

This shift has driven a fundamental change in recipient satisfaction. Studies consistently show that choice-based rewards outperform fixed rewards in terms of perceived value, emotional impact, and behavioral reinforcement. When someone receives a $100 reward and picks exactly what they want, that $100 feels like more than $100.

**Real-Time Recognition**

Digital rewards have made real-time recognition possible at scale. Previously, a manager who wanted to recognize a team member immediately was limited by approval processes, budget cycles, and logistics. Today, that same manager can send a meaningful, branded reward in under a minute.

This speed isn't just convenient — it's psychologically essential. Recognition that arrives while the memory is fresh creates far stronger behavioral reinforcement than recognition that comes weeks later.

**The Data Advantage**

Digital reward platforms generate data that physical programs never could. Which brands are most popular with your team? When do employees redeem their rewards? What's the relationship between recognition frequency and engagement scores? These insights allow companies to continuously improve their programs in ways that simply weren't possible before.

**What This Means for Companies**

The companies winning on culture and retention aren't necessarily spending more — they're spending smarter. By switching to digital, choice-based reward platforms, they're getting higher impact per dollar while dramatically reducing the operational burden on their teams.`,
  },
  {
    id: 5, title: "Building a Culture of Appreciation at Work",
    excerpt: "Culture isn't built in company retreats — it's built in daily moments of acknowledgment. Here's how to make appreciation a habit.",
    author: "Giftable Team", date: "November 18, 2025", readTime: "8 min read", tag: "Culture",
    content: `Company culture is one of those things everyone talks about and few actually build intentionally. Most cultures emerge organically — shaped by the behaviors leaders model, the things that get rewarded, and the stories that get told.

The good news is that appreciation is one of the most powerful levers for shaping culture deliberately. Here's how to build one where people feel genuinely valued.

**Start at the Top**

Culture flows downward. If executives and senior leaders don't visibly recognize great work, managers won't either — and neither will individual contributors. The single most effective thing a leadership team can do is model the recognition behavior they want to see.

This doesn't require grand gestures. A Slack message from the CEO calling out a junior employee's contribution. A personal email from a VP thanking someone for going above and beyond. Small, visible acts of recognition from leaders send a signal that appreciation is a core value — not a box-checking exercise.

**Make It Systematic Without Making It Robotic**

The best recognition cultures are both systematic and authentic. Systems ensure that recognition happens consistently — not just when someone remembers. But authenticity ensures that recognition feels meaningful rather than performative.

The key is to create the infrastructure (regular recognition touchpoints, easy-to-use tools, clear budgets) while leaving room for managers to personalize the experience. A system that makes it easy to send a thoughtful, specific note alongside a reward is far better than one that automates generic congratulations.

**Celebrate Effort, Not Just Outcomes**

Most companies only recognize results: the sale that closed, the project that shipped, the metric that hit. But this creates a culture where only winners feel seen — and discourages the risk-taking and experimentation that drive long-term success.

The companies with the strongest cultures recognize effort, growth, and values-aligned behavior — not just outcomes. Someone who took a creative risk that didn't pan out deserves acknowledgment just as much as someone who hit their number.

**Make Recognition Public and Personal**

Both dimensions matter. Public recognition signals to the whole team that great work is noticed and valued. Personal recognition shows the individual that their specific contribution was seen and understood.

The best recognition programs build in both: a public shoutout in a team meeting or Slack channel, followed by a personal reward with a specific, thoughtful message.

**Measure What Matters**

You can't improve what you don't measure. Track recognition frequency, manager participation rates, and employee feedback on recognition programs. Correlate these metrics with engagement scores, retention rates, and performance data.

Over time, you'll build a clear picture of what works — and the data will make the case for continued investment in appreciation as a business strategy, not just an HR initiative.`,
  },
  {
    id: 6, title: "Employee Rewards vs Bonuses: What Actually Works",
    excerpt: "Cash bonuses are easy to forget. Thoughtful rewards create memories. We break down the psychology of what truly motivates people.",
    author: "Giftable Team", date: "October 7, 2025", readTime: "6 min read", tag: "Strategy",
    content: `Every year, companies spend billions of dollars on cash bonuses — and for what? Most employees have trouble remembering what they did with last year's bonus. Meanwhile, a $50 gift card given at the right moment with a thoughtful message can become a story someone tells for years.

This isn't just anecdote. The psychology of rewards has been studied extensively, and the findings consistently challenge the assumption that cash is king.

**The Fungibility Problem**

Cash is the most fungible asset in the world. When it hits a bank account, it immediately gets absorbed into the undifferentiated pool of money used to pay rent, cover credit card bills, and buy groceries. The reward loses its identity — and with it, any emotional connection to the work that earned it.

Non-cash rewards don't have this problem. A gift card to a restaurant becomes a nice dinner. A gift card to a spa becomes an afternoon of relaxation. These experiences create memories that are associated, however loosely, with the recognition that made them possible.

**The Signaling Effect**

There's another dimension to non-cash rewards that often gets overlooked: the signal they send. A cash bonus can feel like compensation — something owed, something transactional. A thoughtful non-cash reward feels like a gift — something personal, something that required someone to think about you.

This distinction matters enormously for the emotional impact of recognition. The feeling of being known and appreciated is fundamentally different from the feeling of being compensated, and it drives different behavioral and emotional outcomes.

**When Cash Actually Wins**

To be fair, there are contexts where cash is clearly the right choice. For employees facing financial stress, the practical value of cash can outweigh the psychological advantages of non-cash rewards. And for very large recognition amounts ($1,000+), cash or near-cash options (like Visa gift cards) tend to be preferred.

The sweet spot for non-cash rewards is in the $25–$200 range — enough to be meaningful, small enough that the experiential framing matters more than the financial value.

**The Best of Both Worlds**

The most effective approach isn't cash vs. non-cash — it's combining financial recognition with choice-based experiential rewards. Base salaries and bonuses handle the financial dimension. Digital gift cards with personal notes handle the appreciation dimension. Both are necessary; neither is sufficient alone.

Companies that understand this distinction and invest in both consistently outperform those that rely on cash alone for motivation and retention.`,
  },
  {
    id: 7, title: "How Great Companies Celebrate Milestones",
    excerpt: "From work anniversaries to product launches — the companies that celebrate wins together grow faster and retain talent longer.",
    author: "Giftable Team", date: "September 15, 2025", readTime: "5 min read", tag: "Ideas",
    content: `Milestones are moments. And moments, handled well, become stories. Stories become culture. This is why the companies that celebrate wins consistently — loudly and genuinely — tend to build stronger, more resilient teams over time.

**The Types of Milestones That Matter**

Not all milestones are created equal. Here's how to think about the main categories:

*Work anniversaries* are perhaps the most consistently undervalued milestone in corporate life. The first, third, and fifth anniversaries are particularly significant — they represent meaningful investments of time and signal long-term commitment. Treating them as real celebrations, not just calendar reminders, sends a powerful message about how much the company values tenure.

*Project completions* are an opportunity to celebrate collective effort. When a team ships something — a product feature, a campaign, a major client deliverable — the moment of completion deserves acknowledgment before the team moves on to the next challenge. This creates closure and reinforces the connection between hard work and celebration.

*Personal milestones* — promotions, certifications, personal achievements — benefit from company acknowledgment because they show that the organization sees its people as whole humans, not just role-fillers.

*Company milestones* — funding rounds, revenue targets, customer counts — are opportunities to celebrate with the whole team in a way that creates shared ownership of the company's success.

**The Art of the Celebration**

The best celebrations share a few common characteristics. They're timely — happening as close to the milestone as possible. They're specific — acknowledging the particular achievement, not just "great work." And they're proportional — the scale of the celebration matches the significance of the milestone.

A first work anniversary might warrant a personal email from the manager plus a digital gift card. A five-year anniversary might call for a public acknowledgment from leadership, a team lunch, and a more substantial reward. A major product launch might mean a company-wide celebration campaign where every contributor gets to choose their own reward.

**Don't Wait for the Big Moments**

One of the most powerful shifts a company can make is to start celebrating smaller milestones more consistently. The completion of a difficult project. The resolution of a hard problem. The first successful client call. These micro-celebrations create an ongoing rhythm of appreciation that makes the big moments feel even more meaningful.`,
  },
  {
    id: 8, title: "The Best Incentives for Remote Teams",
    excerpt: "Managing a distributed team means rethinking how you show up for people. These incentive strategies work across time zones and borders.",
    author: "Giftable Team", date: "August 22, 2025", readTime: "7 min read", tag: "Remote Work",
    content: `Remote work has solved many problems and created new ones. Among the most significant: how do you build a culture of recognition when your team is spread across a dozen time zones and three continents?

The good news is that distance doesn't diminish the human need for appreciation — it amplifies it. Remote employees, by definition, miss many of the casual social signals that make people feel seen in an office environment. Intentional recognition programs aren't just nice to have for distributed teams; they're essential infrastructure.

**What Works for Remote Teams**

*Digital-first rewards* are the obvious starting point. Physical gifts require addresses, create shipping complexity, and arrive late. Digital gift cards deliver instantly, to anyone, anywhere. For globally distributed teams, the ability to send a meaningful reward to someone in Singapore as easily as someone in New York is transformative.

*Asynchronous recognition* matters more than most managers realize. When your team operates across time zones, recognition can't only happen in sync moments like team meetings. Building in asynchronous channels — a recognition Slack channel, a weekly written shoutout from leadership, a peer-to-peer nomination process — ensures that remote employees in different time zones feel equally seen.

*Over-communicate appreciation*. In an office, a smile, a nod, or a casual "nice work" as you pass someone in the hallway adds up to a significant amount of informal recognition over time. Remote workers don't get any of that. You need to be intentional about replacing it with written and recorded acknowledgment that creates a similar feeling.

**The Isolation Problem**

Remote work can be lonely. Recognition programs that create connection — not just transactional rewards — address this at a deeper level. Peer-to-peer recognition is especially powerful in remote environments because it builds relationships between team members who might otherwise interact only in work contexts.

When someone on your team publicly thanks a colleague for help on a project, they're not just recognizing good work — they're creating a social bond that makes the team more cohesive and the individuals less isolated.

**Practical Starting Points**

For teams just getting started with remote recognition: pick one high-frequency, low-friction channel (a Slack channel dedicated to recognition works well), establish a monthly budget for managers to use for digital rewards, and make peer nominations part of your regular team rituals. That's enough to create a meaningful shift in how remote team members experience their work.`,
  },
  {
    id: 9, title: "Small Gestures That Build Employee Loyalty",
    excerpt: "You don't need a big budget to make people feel seen. These small but intentional gestures compound into lasting employee loyalty.",
    author: "Giftable Team", date: "July 3, 2025", readTime: "4 min read", tag: "Culture",
    content: `Employee loyalty is built in the margins — in the small, consistent gestures that tell people they matter. Companies that understand this don't wait for big moments to show appreciation. They build it into the everyday fabric of how they operate.

Here's a collection of small gestures that, practiced consistently, compound into something significant.

**The Personal Check-In**

Before a meeting, a manager takes 30 seconds to ask genuinely: "How are you doing? How was your weekend?" This isn't a transaction — it's a signal that the person in front of you is more than their output. Over time, this simple practice builds trust and psychological safety in ways that formal programs never could.

**The Specific Compliment**

"Good job" is forgettable. "The way you reframed that problem for the client completely changed the direction of the meeting — that took real skill" is not. Specificity is what separates generic positive reinforcement from recognition that lands.

**The Public Pass-Along**

When a customer, stakeholder, or external partner says something positive about an employee, pass it along formally. Don't let it die in your inbox. Copy the employee, their manager, and if appropriate, share it with the broader team. This closes a loop that most companies leave open.

**The Unexpected Reward**

Scheduled recognition is good. Unscheduled recognition is better. A $25 digital gift card that arrives on a random Tuesday with a note saying "I noticed how hard you worked on that proposal — I wanted to say thank you" has an outsized impact because it wasn't expected.

**The Birthday and Anniversary Text**

Not an automated email from HR. A personal message from the person's direct manager. The difference in how these two things feel is enormous, and the effort required for the personal version is minimal.

**The Development Investment**

Paying for a course, a conference ticket, or a book that's relevant to someone's goals sends a message that the company believes in them as a professional, not just as a current contributor. This is both a small gesture and a long-term investment in loyalty.

The compound effect of these practices — practiced consistently across a management team — is a culture where people choose to stay, choose to give their best, and choose to tell others how great it is to work there.`,
  },
  {
    id: 10, title: "The ROI of Employee Recognition Programs",
    excerpt: "Recognition isn't just a nice-to-have — it's a measurable driver of performance, retention, and bottom-line results. Here's the data.",
    author: "Giftable Team", date: "June 11, 2025", readTime: "6 min read", tag: "Strategy",
    content: `The business case for employee recognition has never been stronger. A growing body of research connects recognition programs to hard business outcomes — retention, productivity, customer satisfaction, and profitability. Here's what the data actually shows.

**The Retention Dividend**

Replacing an employee costs between 50% and 200% of their annual salary, depending on the role and level of seniority. This includes recruiting costs, onboarding time, productivity loss during the transition, and the institutional knowledge that walks out the door.

Companies with strong recognition cultures see significantly lower voluntary turnover. Gallup research suggests the difference can be as large as 31% — a number that translates directly into millions of dollars in avoided replacement costs for mid-sized and large organizations.

**The Productivity Effect**

Recognition doesn't just retain employees — it makes them more productive. Engaged employees, who are significantly more likely to be found in organizations with strong recognition cultures, are measurably more productive than their disengaged counterparts.

A study by Towers Watson found that companies with high employee engagement achieve nearly three times the operating margin of companies with low engagement. While recognition is one of many factors driving engagement, it's one of the most directly actionable.

**Customer Impact**

There's a well-documented connection between employee experience and customer experience. Employees who feel appreciated are more likely to go above and beyond in their customer interactions — and that translates to higher customer satisfaction scores, better retention, and ultimately more revenue.

The Service-Profit Chain model, developed by researchers at Harvard Business School, traces a direct causal path from employee satisfaction to customer loyalty to profitability. Recognition sits at the beginning of that chain.

**Calculating Your ROI**

For a company with 200 employees and an average salary of $80,000:
- Annual replacement cost at 50% salary: $40,000 per person
- If a recognition program reduces turnover by just 5 people per year: $200,000 in avoided costs
- Annual cost of a meaningful recognition program for 200 employees: $20,000–$40,000
- Net ROI: 400–900%

These numbers are conservative. They don't account for productivity improvements, customer impact, or the employer brand benefits of being known as a great place to work.

The question isn't whether recognition programs deliver ROI. The question is why more companies aren't investing in them.`,
  },
  {
    id: 11, title: "Why Choice Matters in Employee Rewards",
    excerpt: "A gift card to the wrong brand is worse than no gift at all. Here's why letting recipients choose their reward drives real satisfaction.",
    author: "Giftable Team", date: "May 28, 2025", readTime: "5 min read", tag: "Product",
    content: `Here's an uncomfortable truth about corporate gifting: a bad gift can actually damage the relationship it was meant to strengthen. When someone receives a reward that has no relevance to their life — a gift card to a restaurant they can't eat at, a subscription service they already have, a brand they've never heard of — the message it sends is: "We didn't really think about you."

This is why choice is not a nice-to-have feature in modern reward programs. It's the difference between recognition that lands and recognition that misfires.

**The Research on Choice**

Behavioral economists have studied the value of choice extensively. The findings are consistent: when people choose their own reward, they value it significantly more than a reward of equivalent monetary value chosen for them.

This "choice premium" exists because choosing engages a different part of the brain than receiving. The act of selection creates ownership — the chosen item becomes "mine" in a way that a given item never quite does.

**The Autonomy Signal**

Beyond the psychological mechanics, choice sends an important social signal: "We trust you to know what you want." This message of respect and autonomy is itself a form of recognition, layered on top of the material reward.

Contrast this with the implicit message of a fixed reward: "We decided what's good for you." Even when the fixed reward is objectively nice, this paternalistic framing can undermine the goodwill the gift was meant to generate.

**Practical Implications**

For companies designing reward programs, the practical implications are clear. Rather than spending time and energy trying to identify the perfect gift for hundreds of employees — an impossible task — invest that energy in building a choice architecture that gives people meaningful options.

This doesn't mean offering unlimited choice. Research actually shows that too many options can be paralyzing. The sweet spot is a curated selection of 10–30 high-quality brands that covers the major categories people care about: food and beverage, retail, experiences, entertainment, and general-purpose options like Visa.

**The Giftable Approach**

This is precisely why Giftable was built around choice from the ground up. Every campaign gives recipients the ability to select from a curated set of brands — not one option, not five hundred, but enough to feel genuinely free to choose what matters to them.

The result is consistently higher satisfaction scores, more social sharing of the recognition experience, and a stronger emotional connection between the reward and the feeling of being appreciated.`,
  },
  {
    id: 12, title: "How Corporate Gifting Strengthens Company Culture",
    excerpt: "The companies with the strongest cultures aren't the ones with the biggest budgets — they're the ones that remember to say thank you.",
    author: "Giftable Team", date: "April 14, 2025", readTime: "6 min read", tag: "Culture",
    content: `Culture is one of those words that gets used constantly and defined rarely. At its core, company culture is the sum of the beliefs, behaviors, and rituals that define how people treat each other and approach their work.

Corporate gifting — done intentionally — is one of the most direct ways to encode appreciation into that culture. Here's how.

**Rituals Create Culture**

Anthropologists have long understood that shared rituals are the glue of human communities. They create predictability, reinforce shared values, and generate the kind of collective emotional experience that binds people together.

Corporate gifting works the same way. When a company consistently celebrates milestones, recognizes great work, and thanks people for their contributions, these practices become rituals. And rituals, over time, become culture.

The companies known for exceptional culture — the ones that appear on every "best places to work" list — tend to share this characteristic: they have developed strong, consistent appreciation rituals that make employees feel part of something meaningful.

**Gifting as a Values Statement**

The way a company approaches gifting says something about what it values. A company that sends generic, low-effort gifts is signaling that appreciation is a checkbox, not a priority. A company that sends thoughtful, choice-based rewards with personal messages is signaling that its people matter as individuals.

This isn't just about the gift itself. It's about what the gift represents: attention, intention, and care. These are the same qualities that define great management and great culture more broadly.

**Scaling Appreciation Without Losing Authenticity**

One of the genuine challenges of building an appreciation culture at scale is maintaining authenticity as the company grows. What works when you have 20 people — the personal touch, the informal check-ins, the handwritten notes — becomes harder to sustain when you have 2,000.

This is exactly the problem that platforms like Giftable are designed to solve. By making it easy to send personalized, meaningful rewards at scale, they allow companies to maintain the authenticity of individual appreciation while reaching everyone in the organization.

**The Culture Flywheel**

When appreciation becomes part of the culture, something interesting happens: it generates its own momentum. Employees who feel valued are more likely to appreciate their colleagues. Managers who see recognition modeled from above are more likely to practice it with their teams. The culture becomes self-reinforcing.

This is the ultimate goal of a thoughtful corporate gifting program — not just to make individuals feel good in isolated moments, but to create a shared language of appreciation that shapes how everyone in the organization shows up for each other.`,
  },
];

const testimonials = [
  { quote: "Giftable makes it incredibly easy to reward our employees. The choice of gift cards means everyone gets something they actually love. Our team engagement scores went up within a month.", name: "Sarah K.", title: "Head of People Operations", company: "Meridian Health", avatar: "SK", color: "bg-violet-500" },
  { quote: "We used to spend weeks coordinating gifts for our sales team. Now it takes minutes. Giftable is the kind of tool you didn't know you needed until you can't imagine working without it.", name: "James T.", title: "VP of Sales", company: "Northstar Labs", avatar: "JT", color: "bg-sky-500" },
  { quote: "Our holiday gifting campaign reached 400 people in under an hour. Every single employee got to pick what they wanted. The feedback was overwhelming — people actually felt appreciated.", name: "Priya M.", title: "Founder & CEO", company: "Wavefront Studio", avatar: "PM", color: "bg-emerald-500" },
];

const pricingPlans = [
  { name: "Starter", subtitle: "For small teams", price: "$49", period: "/mo", desc: "Everything you need to start rewarding your team.", features: ["Up to 50 recipients/month", "Basic campaign tools", "Standard gift card catalog", "Email delivery", "Dashboard analytics"], cta: "Get Started", highlighted: false },
  { name: "Growth", subtitle: "For scaling companies", price: "$149", period: "/mo", desc: "Advanced tools for teams that are growing fast.", features: ["Up to 500 recipients/month", "Bulk campaigns", "Campaign reporting", "Custom branding", "Priority email support", "Recipient segmentation"], cta: "Get Started", highlighted: true },
  { name: "Enterprise", subtitle: "For large organizations", price: "Custom", period: "", desc: "Tailored solutions for large-scale gifting at volume.", features: ["Unlimited recipients", "Dedicated account manager", "API access", "Custom integrations", "SSO & advanced security", "SLA guarantee"], cta: "Contact Sales", highlighted: false },
];

const steps = [
  { number: "01", Icon: Wallet, title: "Create your account and add credits", desc: "Sign up in minutes, fund your gifting wallet, and you're ready to send." },
  { number: "02", Icon: Megaphone, title: "Create a gifting campaign", desc: "Name your campaign, set a budget, and customize the message recipients will see." },
  { number: "03", Icon: LayoutGrid, title: "Choose the brands recipients can select from", desc: "Pick from hundreds of top brands — or let recipients choose from your curated list." },
  { number: "04", Icon: Gift, title: "Recipients pick the gift card they love", desc: "They receive a beautiful email and select their preferred brand. Their gift card arrives instantly." },
];

const benefits = [
  { Icon: Award, title: "Choice for Recipients", desc: "Nobody wants a gift card to the wrong place. Recipients choose the brand they actually want — every time." },
  { Icon: Zap, title: "Fast and Simple", desc: "Send rewards to hundreds of people in minutes. No logistics, no shipping, no headaches." },
  { Icon: TrendingUp, title: "Scalable", desc: "Whether your team is 10 or 10,000, Giftable scales effortlessly with your organization." },
  { Icon: Heart, title: "Meaningful Appreciation", desc: "Turn everyday moments into memorable ones. Celebrate employees and strengthen your culture." },
];

const useCases = [
  { label: "Employee recognition", Icon: Award },
  { label: "Sales incentives", Icon: TrendingUp },
  { label: "Customer appreciation", Icon: Heart },
  { label: "Employee onboarding", Icon: Users },
  { label: "Holiday gifts", Icon: Gift },
  { label: "Milestone celebrations", Icon: Star },
];

const brands = [
  { name: "Amazon", Icon: LayoutGrid, color: "from-amber-50 to-amber-100 border-amber-200", iconColor: "text-amber-600" },
  { name: "Uber", Icon: Globe, color: "from-slate-50 to-slate-100 border-slate-200", iconColor: "text-slate-600" },
  { name: "Starbucks", Icon: Heart, color: "from-green-50 to-green-100 border-green-200", iconColor: "text-green-600" },
  { name: "Visa", Icon: Wallet, color: "from-blue-50 to-blue-100 border-blue-200", iconColor: "text-blue-600" },
  { name: "Apple", Icon: Star, color: "from-gray-50 to-gray-100 border-gray-200", iconColor: "text-gray-600" },
  { name: "Target", Icon: Award, color: "from-red-50 to-red-100 border-red-200", iconColor: "text-red-600" },
];

const companies = ["Meridian Health", "Northstar Labs", "Wavefront Studio", "Pelican Finance", "Silo Corp", "Dune Analytics"];

const tagColors = {
  Culture: "bg-violet-100 text-violet-700",
  Psychology: "bg-sky-100 text-sky-700",
  Ideas: "bg-amber-100 text-amber-700",
  Trends: "bg-emerald-100 text-emerald-700",
  Strategy: "bg-blue-100 text-blue-700",
  Product: "bg-orange-100 text-orange-700",
  "Remote Work": "bg-teal-100 text-teal-700",
};

const teamMembers = [
  { name: "Marcus Reid", title: "Co-Founder & CEO", bio: "Previously led growth at Brex and spent 5 years at Stripe building enterprise partnerships. Marcus started Giftable after seeing firsthand how broken corporate gifting was at scale.", avatar: "MR", color: "bg-blue-500", linkedin: "#", twitter: "#" },
  { name: "Aisha Patel", title: "Co-Founder & CTO", bio: "Former senior engineer at Rippling and Plaid. Aisha built the Giftable platform from scratch and leads our engineering and product teams with a focus on reliability and scale.", avatar: "AP", color: "bg-violet-500", linkedin: "#", twitter: "#" },
  { name: "Daniel Chow", title: "Head of Revenue", bio: "10 years in enterprise SaaS sales, most recently at Lattice and Leapsome. Daniel has helped over 200 companies transform their employee experience through better recognition.", avatar: "DC", color: "bg-emerald-500", linkedin: "#", twitter: "#" },
  { name: "Sofia Navarro", title: "Head of Design", bio: "Previously design lead at Linear and Notion. Sofia brings a product-led approach to every customer touchpoint, ensuring Giftable feels as good as it works.", avatar: "SN", color: "bg-orange-500", linkedin: "#", twitter: "#" },
  { name: "James Okafor", title: "Head of Customer Success", bio: "Built and scaled CS teams at Gusto and Rippling. James and his team have achieved a 98% customer satisfaction score since Giftable's launch.", avatar: "JO", color: "bg-sky-500", linkedin: "#", twitter: "#" },
];

const faqs = [
  { q: "How quickly do recipients receive their gift?", a: "Instantly. Once a campaign is live and a recipient is added, they receive a beautifully designed email within seconds. They can redeem their gift card immediately — no waiting, no delays." },
  { q: "Which gift card brands are available?", a: "We offer 500+ top brands across retail, food and beverage, entertainment, travel, and more — including Amazon, Starbucks, Apple, Uber, Visa, Target, and hundreds of others. Enterprise customers can also request custom brand additions." },
  { q: "Can recipients choose any brand, or is it limited?", a: "When you create a campaign, you choose which brands recipients can select from. You can offer the full catalog or curate a specific list that fits your company values or campaign theme." },
  { q: "How does billing and the wallet work?", a: "You add credits to your Giftable wallet via credit card, ACH, or invoice (Enterprise). Credits are deducted only when recipients claim their gift — unused credits never expire and roll over indefinitely." },
  { q: "Is Giftable secure and compliant?", a: "Yes. Giftable is SOC 2 Type II certified, GDPR compliant, and uses 256-bit encryption for all data in transit and at rest. We also support SSO via Okta, Google, and SAML 2.0." },
  { q: "Can I send gifts internationally?", a: "Yes. Giftable supports recipients in 40+ countries. Gift card availability varies by region, and our platform automatically shows recipients the brands available in their location." },
  { q: "Do you integrate with our HRIS or Slack?", a: "Yes. We integrate with BambooHR, Workday, Rippling, and most major HRIS platforms. We also have a native Slack integration that lets managers send rewards directly from Slack. Full API access is available on Growth and Enterprise plans." },
  { q: "What happens if a recipient doesn't claim their gift?", a: "Unclaimed gifts can be resent, reassigned, or returned to your wallet. You're never charged for gifts that aren't claimed, and you have full visibility into redemption status in your dashboard." },
  { q: "Is there a minimum spend or contract required?", a: "No minimum spend and no long-term contract on Starter and Growth plans. Enterprise plans are annual contracts with custom pricing based on volume." },
  { q: "How do I get started?", a: "Create an account, add credits to your wallet, and send your first gift in under 5 minutes. No setup fee, no onboarding call required — though we're always happy to help." },
];

const securityBadges = [
  { Icon: Shield, label: "SOC 2 Type II", sublabel: "Certified" },
  { Icon: FileCheck, label: "GDPR", sublabel: "Compliant" },
  { Icon: Lock, label: "256-bit", sublabel: "Encryption" },
  { Icon: KeyRound, label: "SSO Ready", sublabel: "Okta, Google, SAML" },
];

// ─── BLOG POST PAGE ───────────────────────────────────────────────────────────

function BlogPostPage({ post, onBack }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const tagColor = tagColors[post.tag] || "bg-slate-100 text-slate-600";

  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            <ChevronLeft size={16} /> Back to Blog
          </button>
          <a href="#" onClick={onBack}>
            <GiftableLogo height={28} />
          </a>
          <a href="#contact" onClick={onBack} className="bg-[#4F8EF7] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Get Started
          </a>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-14 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColor}`}>{post.tag}</span>
          <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold text-[#111827] leading-tight mb-6" style={{ letterSpacing: "-1.5px" }}>
          {post.title}
        </h1>

        <p className="text-xl text-slate-500 leading-relaxed mb-8">{post.excerpt}</p>

        <div className="flex items-center gap-3 pb-8 border-b border-slate-100">
          <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
            <BookOpen size={15} className="text-[#4F8EF7]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#111827]">{post.author}</p>
            <p className="text-xs text-slate-400">{post.date}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        <div className="prose-custom space-y-5">
          {paragraphs.map((para, i) => {
            if (para.startsWith("**") && para.endsWith("**") && !para.slice(2).includes("**")) {
              return <h2 key={i} className="text-2xl font-bold text-[#111827] mt-10 mb-2" style={{ letterSpacing: "-0.5px" }}>{para.replace(/\*\*/g, "")}</h2>;
            }
            if (para.startsWith("*") && para.endsWith("*")) {
              return <h3 key={i} className="text-lg font-semibold text-[#111827] mt-6 mb-1">{para.replace(/\*/g, "")}</h3>;
            }
            // Handle inline bold
            const parts = para.split(/\*\*(.*?)\*\*/g);
            return (
              <p key={i} className="text-base text-slate-700 leading-relaxed">
                {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="font-semibold text-[#111827]">{part}</strong> : part)}
              </p>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8 border border-blue-100 text-center">
          <h3 className="text-2xl font-bold text-[#111827] mb-3" style={{ letterSpacing: "-0.5px" }}>Ready to start recognizing your team?</h3>
          <p className="text-slate-500 mb-6">Send your first gift in under 5 minutes. No credit card required.</p>
          <button onClick={onBack} className="bg-[#4F8EF7] hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 mx-auto">
            <Gift size={16} /> Try Giftable Free
          </button>
        </div>

        {/* Related posts */}
        <div className="mt-16">
          <h3 className="text-lg font-bold text-[#111827] mb-6">More from the blog</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {blogPosts.filter(p => p.id !== post.id).slice(0, 2).map(p => (
              <button key={p.id} onClick={() => { window.scrollTo(0,0); onBack(p); }}
                className="text-left bg-slate-50 border border-slate-100 rounded-xl p-5 hover:border-blue-200 hover:bg-blue-50 transition-all group">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tagColors[p.tag] || "bg-slate-100 text-slate-600"} inline-block mb-2`}>{p.tag}</span>
                <p className="font-semibold text-[#111827] text-sm leading-snug group-hover:text-[#4F8EF7] transition-colors">{p.title}</p>
                <p className="text-xs text-slate-400 mt-2">{p.date} · {p.readTime}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Navbar({ onBlogClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center"><GiftableLogo height={36} /></a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">{l.label}</a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a href="#contact" className="text-sm font-semibold text-[#4F8EF7] hover:text-blue-700 transition-colors">Sign In</a>
          <a href="#contact" className="bg-[#4F8EF7] hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:shadow-md hover:shadow-blue-200 flex items-center gap-2">
            Start Sending Gifts <ArrowRight size={14} />
          </a>
        </div>
        <button className="md:hidden p-2 rounded-md text-slate-600" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm font-medium text-slate-700" onClick={() => setMobileOpen(false)}>{l.label}</a>
          ))}
          <a href="#contact" className="bg-[#4F8EF7] text-white text-sm font-semibold px-4 py-2 rounded-lg text-center" onClick={() => setMobileOpen(false)}>Start Sending Gifts</a>
        </div>
      )}
    </header>
  );
}

function HeroDashboard() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-50">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">Wallet Balance</p>
            <p className="text-2xl font-bold text-slate-900">$4,200.00</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#4F8EF7] flex items-center justify-center">
            <Wallet size={18} className="text-white" />
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#4F8EF7] uppercase tracking-wide">Active Campaign</span>
            <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Live
            </span>
          </div>
          <p className="font-semibold text-slate-800 text-sm">Q1 Team Appreciation</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-blue-100 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-[#4F8EF7] rounded-full"></div>
            </div>
            <span className="text-xs text-slate-500">75% claimed</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium mb-2">Recipients can choose from</p>
          <div className="flex gap-2 flex-wrap">
            {["Amazon", "Starbucks", "Apple", "Visa"].map((b) => (
              <span key={b} className="text-xs bg-slate-50 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-medium">{b}</span>
            ))}
          </div>
        </div>
        <div className="space-y-2.5">
          {[
            { name: "Alex M.", brand: "Starbucks", time: "2m ago", bg: "bg-green-100", color: "text-green-700" },
            { name: "Jordan L.", brand: "Amazon", time: "11m ago", bg: "bg-amber-100", color: "text-amber-700" },
            { name: "Casey P.", brand: "Apple", time: "1h ago", bg: "bg-slate-100", color: "text-slate-600" },
          ].map((r) => (
            <div key={r.name} className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full ${r.bg} flex items-center justify-center`}>
                <User size={12} className={r.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-800">{r.name} chose {r.brand}</p>
              </div>
              <span className="text-xs text-slate-400">{r.time}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
        <CheckCircle size={13} /> Gift Sent!
      </div>
      <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg border border-slate-100 p-3 text-center">
        <p className="text-lg font-bold text-slate-900">98%</p>
        <p className="text-xs text-slate-500">Satisfaction</p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-24 overflow-hidden" style={{ background: "linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #fff7f0 100%)" }}>
      <div className="absolute top-20 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-40 translate-x-1/3"></div>
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#4F8EF7] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 bg-[#4F8EF7] rounded-full animate-pulse"></span>
                Corporate Gifting Platform
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-5xl lg:text-6xl font-bold text-[#111827] leading-tight mb-6" style={{ letterSpacing: "-1.5px" }}>
                Corporate Gifting{" "}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #4F8EF7, #FF6B4A)" }}>
                  Made Effortless
                </span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-xl text-slate-600 leading-relaxed mb-4">Send thoughtful digital rewards to employees, customers, and partners in minutes.</p>
              <p className="text-base text-slate-500 leading-relaxed mb-8">Giftable helps companies celebrate people — whether it's a milestone, a thank you, or a moment of recognition.</p>
            </Reveal>
            <Reveal delay={220}>
              <div className="flex flex-wrap gap-3">
                <a href="#contact" className="bg-[#4F8EF7] hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-200 flex items-center gap-2">
                  <Gift size={16} /> Start Sending Gifts
                </a>
                <a href="#how-it-works" className="bg-white hover:bg-slate-50 text-slate-800 font-semibold px-6 py-3 rounded-xl border border-slate-200 transition-colors flex items-center gap-2">
                  See How It Works <ArrowRight size={16} />
                </a>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-10 flex items-center gap-6">
                {[["500+", "Companies"], ["2M+", "Gifts Sent"], ["98%", "Satisfaction"]].map(([stat, label], i) => (
                  <div key={label} className="flex items-center gap-6">
                    {i > 0 && <div className="w-px h-10 bg-slate-200"></div>}
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#111827]">{stat}</p>
                      <p className="text-sm text-slate-500">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={100} className="flex justify-center lg:justify-end">
            <HeroDashboard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section className="py-14 border-y border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">Trusted by companies that care about their people</p>
        <div className="flex flex-wrap justify-center gap-4">
          {companies.map((name) => (
            <div key={name} className="bg-slate-50 border border-slate-100 text-slate-500 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-2">
              <Building2 size={13} className="text-slate-400" /> {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Security() {
  return (
    <section className="py-12 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-10">
          {securityBadges.map(({ Icon, label, sublabel }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Icon size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{label}</p>
                <p className="text-slate-400 text-xs">{sublabel}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Globe size={18} className="text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">40+ Countries</p>
              <p className="text-slate-400 text-xs">Global delivery</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="text-[#4F8EF7] font-semibold text-sm uppercase tracking-wider">Simple Process</span>
          <h2 className="text-4xl font-bold text-[#111827] mt-3 mb-4" style={{ letterSpacing: "-1px" }}>How It Works</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Your team gets choice. You get simplicity.</p>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 80}>
              <div className="relative bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group h-full">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-3 z-10">
                    <ArrowRight size={16} className="text-slate-300" />
                  </div>
                )}
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <step.Icon size={20} className="text-[#4F8EF7]" />
                </div>
                <span className="text-xs font-bold text-[#FF6B4A] tracking-widest">{step.number}</span>
                <h3 className="font-semibold text-[#111827] mt-1 mb-2 text-base leading-snug">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="py-24" style={{ background: "linear-gradient(180deg, #F4F6FB 0%, #ffffff 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="text-[#FF6B4A] font-semibold text-sm uppercase tracking-wider">Benefits</span>
          <h2 className="text-4xl font-bold text-[#111827] mt-3" style={{ letterSpacing: "-1px" }}>Why Companies Choose Giftable</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map(({ Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all h-full">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#4F8EF7]" />
                </div>
                <h3 className="font-bold text-[#111827] mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <Reveal>
          <span className="text-[#4F8EF7] font-semibold text-sm uppercase tracking-wider">Use Cases</span>
          <h2 className="text-4xl font-bold text-[#111827] mt-3 mb-6" style={{ letterSpacing: "-1px" }}>Perfect For</h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {useCases.map(({ label, Icon }) => (
              <div key={label} className="flex items-center gap-2 bg-slate-50 border border-slate-200 hover:border-[#4F8EF7] hover:bg-blue-50 text-slate-700 font-medium px-5 py-3 rounded-full transition-all cursor-default text-sm group">
                <Icon size={15} className="text-slate-400 group-hover:text-[#4F8EF7] transition-colors" /> {label}
              </div>
            ))}
          </div>
          <p className="text-base text-slate-400 max-w-lg mx-auto">Every moment of appreciation strengthens your company culture.</p>
        </Reveal>
      </div>
    </section>
  );
}

function Brands() {
  return (
    <section className="py-24" style={{ background: "linear-gradient(135deg, #f0f7ff 0%, #fff7f0 100%)" }}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <Reveal>
          <span className="text-[#FF6B4A] font-semibold text-sm uppercase tracking-wider">Gift Card Catalog</span>
          <h2 className="text-4xl font-bold text-[#111827] mt-3 mb-4" style={{ letterSpacing: "-1px" }}>Give people a gift they actually want</h2>
          <p className="text-slate-500 mb-12 max-w-lg mx-auto">Hundreds of top brands. Recipients choose what they love.</p>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-3xl mx-auto">
          {brands.map(({ name, Icon, color, iconColor }, i) => (
            <Reveal key={name} delay={i * 60}>
              <div className={`bg-gradient-to-b ${color} border rounded-2xl p-5 flex flex-col items-center gap-3 hover:shadow-md hover:-translate-y-1 transition-all`}>
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Icon size={18} className={iconColor} />
                </div>
                <span className="text-xs font-semibold text-slate-700">{name}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}><p className="text-sm text-slate-400 mt-8">+ hundreds more brands available in the catalog</p></Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="text-[#4F8EF7] font-semibold text-sm uppercase tracking-wider">Social Proof</span>
          <h2 className="text-4xl font-bold text-[#111827] mt-3" style={{ letterSpacing: "-1px" }}>What Companies Are Saying</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col hover:shadow-md hover:border-blue-100 transition-all h-full">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-slate-700 leading-relaxed flex-1 text-sm">{t.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold`}>{t.avatar}</div>
                  <div>
                    <p className="font-semibold text-[#111827] text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.title}, {t.company}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-24" style={{ background: "linear-gradient(180deg, #F4F6FB 0%, #ffffff 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="text-[#4F8EF7] font-semibold text-sm uppercase tracking-wider">Pricing</span>
          <h2 className="text-4xl font-bold text-[#111827] mt-3 mb-4" style={{ letterSpacing: "-1px" }}>Simple, Transparent Pricing</h2>
          <p className="text-slate-500 max-w-lg mx-auto">Start for free, scale as you grow. No hidden fees, ever.</p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 100}>
              <div className={`rounded-2xl p-7 flex flex-col transition-all h-full ${plan.highlighted ? "bg-[#4F8EF7] text-white shadow-2xl shadow-blue-200 scale-105" : "bg-white border border-slate-100 shadow-sm hover:shadow-md"}`}>
                {plan.highlighted && <span className="bg-[#FF6B4A] text-white text-xs font-bold px-3 py-1 rounded-full self-start mb-4">Most Popular</span>}
                <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? "text-white" : "text-[#111827]"}`}>{plan.name}</h3>
                <p className={`text-sm mb-5 ${plan.highlighted ? "text-blue-200" : "text-slate-400"}`}>{plan.subtitle}</p>
                <div className="flex items-end gap-1 mb-2">
                  <span className={`text-4xl font-bold ${plan.highlighted ? "text-white" : "text-[#111827]"}`}>{plan.price}</span>
                  {plan.period && <span className={`text-sm mb-2 ${plan.highlighted ? "text-blue-200" : "text-slate-400"}`}>{plan.period}</span>}
                </div>
                <p className={`text-sm mb-6 ${plan.highlighted ? "text-blue-100" : "text-slate-500"}`}>{plan.desc}</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle size={14} className={`mt-0.5 flex-shrink-0 ${plan.highlighted ? "text-blue-200" : "text-[#4F8EF7]"}`} />
                      <span className={`text-sm ${plan.highlighted ? "text-blue-100" : "text-slate-600"}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`text-center font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${plan.highlighted ? "bg-white text-[#4F8EF7] hover:bg-blue-50" : "bg-[#4F8EF7] text-white hover:bg-blue-600"}`}>
                  {plan.cta} <ArrowRight size={14} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <span className="text-[#FF6B4A] font-semibold text-sm uppercase tracking-wider">Our Mission</span>
          <h2 className="text-4xl font-bold text-[#111827] mt-3 mb-8" style={{ letterSpacing: "-1px" }}>Built to help companies show appreciation</h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-3xl p-10 border border-blue-100 text-left space-y-5">
            <p className="text-lg text-slate-700 leading-relaxed">Giftable was created to help companies show appreciation in a simple and meaningful way.</p>
            <p className="text-base text-slate-600 leading-relaxed">Recognizing people should not be complicated. For too long, corporate gifting has meant clunky spreadsheets, generic swag, and one-size-fits-all orders. We built Giftable because we believed there was a better way.</p>
            <p className="text-base text-slate-600 leading-relaxed">Whether you are celebrating a milestone, thanking a customer, or rewarding your team, Giftable helps companies deliver appreciation at scale — without the friction.</p>
            <p className="text-base text-slate-600 leading-relaxed">When people feel valued, they do their best work. We're here to make that easy for every company, at every size.</p>
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-3 gap-6">
          {[{ Icon: Building2, stat: "500+", label: "Companies" }, { Icon: Gift, stat: "2M+", label: "Gifts Delivered" }, { Icon: Globe, stat: "40+", label: "Countries" }].map(({ Icon, stat, label }, i) => (
            <Reveal key={label} delay={i * 80}>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3"><Icon size={20} className="text-[#4F8EF7]" /></div>
                <p className="text-3xl font-bold text-[#111827]">{stat}</p>
                <p className="text-sm text-slate-500">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="py-24" style={{ background: "linear-gradient(180deg, #F4F6FB 0%, #ffffff 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="text-[#4F8EF7] font-semibold text-sm uppercase tracking-wider">Our Team</span>
          <h2 className="text-4xl font-bold text-[#111827] mt-3 mb-4" style={{ letterSpacing: "-1px" }}>The people behind Giftable</h2>
          <p className="text-slate-500 max-w-lg mx-auto">Built by a team that has worked inside the companies we now serve.</p>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, i) => (
            <Reveal key={member.name} delay={i * 80}>
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl ${member.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                    {member.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#111827]">{member.name}</h3>
                    <p className="text-sm text-[#4F8EF7] font-medium">{member.title}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{member.bio}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                  <a href={member.linkedin} className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-blue-100 transition-colors">
                    <Linkedin size={13} className="text-slate-500 hover:text-[#4F8EF7]" />
                  </a>
                  <a href={member.twitter} className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-blue-100 transition-colors">
                    <Twitter size={13} className="text-slate-500 hover:text-[#4F8EF7]" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="text-[#FF6B4A] font-semibold text-sm uppercase tracking-wider">FAQ</span>
          <h2 className="text-4xl font-bold text-[#111827] mt-3 mb-4" style={{ letterSpacing: "-1px" }}>Common Questions</h2>
          <p className="text-slate-500">Everything you need to know before getting started.</p>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 40}>
              <div className={`border rounded-2xl overflow-hidden transition-all ${open === i ? "border-blue-200 shadow-sm" : "border-slate-100 hover:border-slate-200"}`}>
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-semibold text-[#111827] text-sm pr-4">{faq.q}</span>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${open === i ? "bg-blue-100" : "bg-slate-100"}`}>
                    {open === i ? <Minus size={14} className="text-[#4F8EF7]" /> : <Plus size={14} className="text-slate-500" />}
                  </div>
                </button>
                {open === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogCard({ post, onClick, delay = 0 }) {
  const tagColor = tagColors[post.tag] || "bg-slate-100 text-slate-600";
  return (
    <Reveal delay={delay}>
      <article
        onClick={() => onClick(post)}
        className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden group cursor-pointer flex flex-col h-full"
      >
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #4F8EF7, #FF6B4A)" }}></div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColor}`}>{post.tag}</span>
            <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
          </div>
          <h3 className="font-bold text-[#111827] leading-snug mb-3 group-hover:text-[#4F8EF7] transition-colors flex-1">{post.title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-4">{post.excerpt}</p>
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center"><BookOpen size={11} className="text-[#4F8EF7]" /></div>
              <span className="text-xs text-slate-500">{post.author}</span>
            </div>
            <span className="text-xs text-slate-400">{post.date}</span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Blog({ onPostClick }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? blogPosts : blogPosts.slice(0, 6);

  return (
    <section id="blog" className="py-24" style={{ background: "linear-gradient(180deg, #F4F6FB 0%, #ffffff 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <Reveal>
            <span className="text-[#4F8EF7] font-semibold text-sm uppercase tracking-wider">Resources</span>
            <h2 className="text-4xl font-bold text-[#111827] mt-3" style={{ letterSpacing: "-1px" }}>Insights & Ideas</h2>
            <p className="text-slate-500 mt-2 max-w-md">Practical guides on employee recognition, culture, and appreciation.</p>
          </Reveal>
          <button onClick={() => setShowAll(!showAll)} className="text-[#4F8EF7] font-semibold text-sm hover:text-blue-700 transition-colors self-start md:self-end flex items-center gap-1">
            {showAll ? "Show less" : `View all ${blogPosts.length} articles`}
            <ChevronDown size={14} className={`transition-transform ${showAll ? "rotate-180" : ""}`} />
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((post, i) => <BlogCard key={post.id} post={post} onClick={onPostClick} delay={i * 60} />)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const FORMSPREE_ID = "mreykoba";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
      else setSubmitted(true);
    } catch { setSubmitted(true); }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <span className="text-[#FF6B4A] font-semibold text-sm uppercase tracking-wider">Get Started</span>
          <h2 className="text-4xl font-bold text-[#111827] mt-3 mb-4" style={{ letterSpacing: "-1px" }}>Book a Demo</h2>
          <p className="text-slate-500 max-w-lg mx-auto">See Giftable in action. We'll show you how easy it is to start sending meaningful rewards to your team.</p>
        </Reveal>
        {submitted ? (
          <Reveal>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={28} className="text-emerald-500" /></div>
              <h3 className="text-xl font-bold text-[#111827] mb-2">We'll be in touch soon!</h3>
              <p className="text-slate-500">Thanks for reaching out. Our team will contact you within 1 business day.</p>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={100}>
            <form onSubmit={handleSubmit} className="bg-slate-50 rounded-2xl border border-slate-100 p-8 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5"><User size={13} className="text-slate-400" /> Name</label>
                  <input type="text" required placeholder="Your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F8EF7] focus:border-transparent text-sm transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5"><Building2 size={13} className="text-slate-400" /> Company</label>
                  <input type="text" required placeholder="Your company name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F8EF7] focus:border-transparent text-sm transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5"><Mail size={13} className="text-slate-400" /> Email</label>
                <input type="email" required placeholder="your@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F8EF7] focus:border-transparent text-sm transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5"><MessageSquare size={13} className="text-slate-400" /> Message</label>
                <textarea rows={4} placeholder="Tell us about your team and what you're looking for..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F8EF7] focus:border-transparent text-sm transition-all resize-none" />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[#4F8EF7] hover:bg-blue-600 disabled:opacity-70 text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-200 text-sm flex items-center justify-center gap-2">
                {loading ? "Sending..." : <><Send size={15} /> Book a Demo</>}
              </button>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-24" style={{ background: "linear-gradient(135deg, #3b6fd4 0%, #4F8EF7 50%, #FF6B4A 100%)" }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <div className="flex justify-center mb-6"><GiftableLogo height={40} white /></div>
          <h2 className="text-5xl font-bold text-white mb-4" style={{ letterSpacing: "-1.5px" }}>Make Someone's Day Today</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">A small gesture of appreciation can make a big impact. Start sending in minutes.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contact" className="bg-white text-[#4F8EF7] font-bold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg flex items-center gap-2">
              <Gift size={16} /> Create Your Giftable Account
            </a>
            <a href="#contact" className="bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-xl transition-colors border border-white/20 flex items-center gap-2">
              <Send size={15} /> Book a Demo
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = {
    Product: ["How It Works", "Pricing", "Integrations", "API Docs"],
    Company: ["About", "Blog", "Careers", "Press"],
    Support: ["Contact", "Help Center", "Status", "Security"],
  };
  return (
    <footer className="bg-[#111827] text-slate-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <a href="#" className="flex items-center mb-4"><GiftableLogo height={32} white /></a>
            <p className="text-sm leading-relaxed text-slate-500">Built to help companies show appreciation.</p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}><a href="#" className="text-sm hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">© {new Date().getFullYear()} Giftable. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-slate-600 hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="text-sm text-slate-600 hover:text-slate-300 transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeBlogPost, setActiveBlogPost] = useState(null);

  const handlePostClick = (post) => setActiveBlogPost(post);
  const handleBack = (relatedPost) => {
    if (relatedPost && relatedPost.id) {
      setActiveBlogPost(relatedPost);
    } else {
      setActiveBlogPost(null);
    }
  };

  if (activeBlogPost) {
    return <BlogPostPage post={activeBlogPost} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen antialiased scroll-smooth" style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif", color: "#111827", background: "#ffffff" }}>
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <Security />
        <HowItWorks />
        <Benefits />
        <UseCases />
        <Brands />
        <Testimonials />
        <Pricing />
        <About />
        <Team />
        <FAQ />
        <Blog onPostClick={handlePostClick} />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
