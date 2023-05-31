import { useEffect, useRef } from 'react';
import * as AdaptiveCards from 'adaptivecards';

const AdaptiveCardsSample = () => {
  const adaptiveCardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderAdaptiveCard = () => {
      console.log("printed")
      const adaptiveCard = new AdaptiveCards.AdaptiveCard();
      adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
        fontFamily: 'Segoe UI, Helvetica Neue, sans-serif',
        // More host config options
      });
      // Set the adaptive card's event handlers. onExecuteAction is invoked
      // whenever an action is clicked in the card
      adaptiveCard.onExecuteAction = function (action) {
        alert('Ow!');
      };
      adaptiveCard.parse({
        type: 'AdaptiveCard',
        version: '1.0',
        body: [
          {
            type: 'Image',
            url: 'https://adaptivecards.io/content/adaptive-card-50.png',
          },
          {
            type: 'TextBlock',
            text: 'Hello **Adaptive Cards!**',
          },
        ],
        actions: [
          {
            type: 'Action.OpenUrl',
            title: 'Learn more',
            url: 'https://adaptivecards.io',
          },
          {
            type: 'Action.OpenUrl',
            title: 'GitHub',
            url: 'https://github.com/Microsoft/AdaptiveCards',
          },
        ],
      });

      // Render the Adaptive Card
      const renderedCard = adaptiveCard.render();
      if (renderedCard !== undefined ) adaptiveCardContainerRef?.current?.appendChild(renderedCard);
    };

    renderAdaptiveCard();
  }, []);


  return <div ref={adaptiveCardContainerRef} />;
};

export default AdaptiveCardsSample;
