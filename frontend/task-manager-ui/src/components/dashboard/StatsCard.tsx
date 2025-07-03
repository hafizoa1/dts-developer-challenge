import React from 'react';
import { TaskStats } from '../../types/Task';

interface StatsCardsProps {
  stats: TaskStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: '📋',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-900',
    },
    {
      title: 'To Do',
      value: stats.todo,
      icon: '☐',
      bgColor: 'bg-gray-50',
      iconColor: 'text-gray-600',
      textColor: 'text-gray-900',
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: '⏳',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-900',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: '✅',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      textColor: 'text-green-900',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} overflow-hidden rounded-lg border border-gray-200 shadow-sm`}
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className={`text-2xl ${card.iconColor}`}>
                  {card.icon}
                </span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className={`text-sm font-medium ${card.textColor} truncate`}>
                    {card.title}
                  </dt>
                  <dd>
                    <div className={`text-3xl font-bold ${card.textColor}`}>
                      {card.value}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;