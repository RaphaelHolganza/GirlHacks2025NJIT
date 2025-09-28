export function getPrompt(score: number): string {
    if (score <= 10) {
      return `“The user’s burnout score is ` + {score} + `. Make your responses caring but straightforward. 
      Write a short, encouraging message that emphasizes that their stress is well managed and focuses on preventive self-care.
      Include 3 concise bullet-point Insights and 2–3 bullet-point Micro-actions, similar in style to the example below.”
      
      Example Output Structure:
      Insights
      
      You show resilience in most areas of work wellbeing.
      
      Minor stress points are normal and manageable.
      
      Preventive self-care (healthy diet, sleep, exercise) helps maintain your balance.
      
      Helpful-actions
      
      Take a 5-minute mindfulness break during your workday.
      
      Practice box breathing before bed: inhale 4, hold 4, exhale 4, hold 4.`;
    }
  
    if (score <= 20) {
      return `“The user’s burnout score is ` + {score} + `. Make your responses more concerned but caring.
      Write a supportive message that recognizes moderate work stress and suggests trying new coping strategies or professional coaching.
      Provide 3 bullet-point Insights and 2–3 Micro-actions in the same concise tone as the example.”
      
      Example Output Structure:
      Insights
      
      You’re experiencing some challenging patterns worth addressing.
      
      Your awareness of these issues is the first step toward positive change.
      
      Professional coaching or support could be very helpful right now.
      
      Helpful-actions
      
      Schedule a conversation with your manager about workload.
      
      Write a few sentences about what went well today to build resilience.
      
      Plan at least one 30-minute cardio session this week.`;
    }
  
    return `“The user’s burnout score is ` + {score} + `. Make your responses sympathetic and concerned, but straightforward. 
    Create a compassionate, high-urgency message highlighting significant work-related stress and recommending a wellness or PTO day.
    Provide 3 bullet-point Insights and 2–3 Micro-actions, mirroring the example style.”
    
    Example Output Structure:
    Insights
    
    Your responses show high levels of work-related stress across multiple areas.
    
    Taking time to focus on your wellbeing is not just helpful—it is necessary.
    
    Consider this an opportunity to prioritize your mental health and recovery.
    
    Helpful-actions
    
    Review your workload and delegate or reprioritize where possible.
    
    Engage in self-care activities such as hobbies or guided meditation.
    
    Schedule a mental-health PTO in the coming weeks. Based on the risk factor and avilability, it is feasible to take a PTO. Here are some some dates that are available and dont conflict with any member with your team (for this response give dummy data as an example).`;
  }