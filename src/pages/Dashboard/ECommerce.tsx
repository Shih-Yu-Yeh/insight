import React, { useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChartFour from '../../components/Charts/ChartFour';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import DefaultLayout from '../../layout/DefaultLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';

const ECommerce: React.FC = () => {
  const [cardStatsCount, setCardStatsCount] = useState<number>(1);
  const [showXButton, setShowXButton] = useState<boolean>(false);

  const handleAddCardStats = () => {
    setCardStatsCount(prevCount => prevCount + 1);
    setShowXButton(true);
  };

  const handleRemoveCardStats = () => {
    if (cardStatsCount > 1) {
      setCardStatsCount(prevCount => prevCount - 1);
    }
  };

  const renderCardStats = (): JSX.Element[] => {
    const cardStatsArray: JSX.Element[] = [];
    for (let i = 0; i < cardStatsCount; i++) {
      cardStatsArray.push(
        <div key={i} className="relative">
          {i === 0 && (
            <button
              onClick={handleAddCardStats}
              className="absolute top-2 left-2 bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center"
            >
              +
            </button>
          )}
          {showXButton && i > 0 && (
            <button
              onClick={handleRemoveCardStats}
              className="absolute top-2 right-2 bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center"
            >
              x
            </button>
          )}
          <CardDataStats title="" total="" rate="">
            <svg> </svg>
          </CardDataStats>
        </div>
      );
    }
    return cardStatsArray;
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {renderCardStats()}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <ChartFour />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
