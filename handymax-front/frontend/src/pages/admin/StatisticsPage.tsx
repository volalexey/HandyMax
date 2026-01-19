import { useState } from "react";
import { DropDown } from "../../components/adminPanel/DropDown";
import { useGetStatisticsQuery } from "../../store/api/statisticsApi";

export const StatisticsPage = () => {
  const [applicationsPeriod, setApplicationsPeriod] = useState<string>('week');
  const [statusPeriod, setStatusPeriod] = useState<string>('week');
  const [incomePeriod, setIncomePeriod] = useState<string>('week');

  const timeOptions = ['week', 'month'];
  const cardClasses = "bg-[#FF7420]/40 rounded-[20px] p-[20px_10px_10px_15px] flex flex-col justify-between gap-[15px] w-full";

  const { data: appData } = useGetStatisticsQuery(applicationsPeriod);
  const { data: statusData } = useGetStatisticsQuery(statusPeriod);
  const { data: incomeData } = useGetStatisticsQuery(incomePeriod);
  
  const { data: generalData } = useGetStatisticsQuery('week'); 

  return (
    <div className="bg-white w-full min-h-[80vh] flex flex-col gap-[60px] rounded-[20px] p-[20px] lg:rounded-[80px] lg:p-[40px_60px]">
      
      <div className="flex flex-col gap-[25px]">
        <h2 className="text-[1.5rem] lg:text-[2.25rem] font-extrabold text-black">
          General order statistics
        </h2>
        
        <div className="flex flex-col lg:flex-row justify-start gap-[20px] lg:gap-[40px]">
          
          <div className={cardClasses}>
            <div className="flex justify-between gap-2">
              <h3 className="text-[1rem] font-medium">Number of applications</h3>
              <DropDown 
                options={timeOptions} 
                selectedValue={applicationsPeriod} 
                setSelectedValue={setApplicationsPeriod} 
              />
            </div>
            <div>
              <p className="text-[1.25rem] font-light">
                <span className="text-[3rem] font-medium mr-2">
                   {appData?.orders.total || 0}
                </span> 
                /in a {applicationsPeriod}
              </p>
            </div>
          </div>

          <div className={cardClasses}>
            <div className="flex justify-between gap-2">
              <h3 className="text-[1rem] font-medium">Application status</h3>
              <DropDown 
                options={timeOptions} 
                selectedValue={statusPeriod} 
                setSelectedValue={setStatusPeriod}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[1rem] font-light">Processed: <span className="font-bold">{statusData?.orders.processed || 0}</span></p>
              <p className="text-[1rem] font-light">Waiting: <span className="font-bold">{statusData?.orders.waiting || 0}</span></p>
              <p className="text-[1rem] font-light">Rejected: <span className="font-bold">{statusData?.orders.rejected || 0}</span></p>
            </div>
          </div>

          <div className={cardClasses}>
            <div className="flex justify-between gap-2">
              <h3 className="text-[1rem] font-medium">Total income</h3>
              <DropDown 
                options={timeOptions} 
                selectedValue={incomePeriod} 
                setSelectedValue={setIncomePeriod}
              />
            </div>
            <div>
              <p className="text-[3rem] font-bold leading-none">
                € <span className="text-[3rem] font-medium">{incomeData?.income || 0}</span>
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="flex flex-col gap-[25px] max-w-[85%]">
        <h2 className="text-[1.5rem] lg:text-[2.25rem] font-extrabold text-black">
          General customer statistics
        </h2>
        
        <div className="flex flex-col lg:flex-row justify-between gap-[20px] lg:gap-[40px]">
          
          <div className="flex flex-col items-start gap-[12px]">
            <h3 className="text-[1rem] font-bold">Top 5 regular customers:</h3>
            {generalData?.customers.top && generalData.customers.top.length > 0 ? (
                <ol className="list-decimal ml-[20px] flex flex-col gap-1">
                  {generalData.customers.top.map((customer, idx) => (
                      <li key={idx}>
                          {customer.name} {customer.phone !== '-' ? customer.phone : ''}
                      </li>
                  ))}
                </ol>
            ) : (
                <p className="text-gray-400 italic">No data yet</p>
            )}
          </div>

          <div className="flex flex-col items-start gap-[12px]">
            <h3 className="text-[1rem] font-bold">Number of new customers:</h3>
            <p className="text-[1.25rem] font-light">
              <span className="text-[3rem] font-medium mr-2">{generalData?.customers.new || 0}</span>/in a week
            </p>
          </div>

          <div className="flex flex-col items-start gap-[12px]">
            <h3 className="text-[1rem] font-bold">Repeat orders</h3>
            <p className="text-[1.25rem] font-light">
              <span className="text-[3rem] font-medium mr-2">{generalData?.customers.repeat || 0}</span>/in a week
            </p>
          </div>

        </div>
      </div>


      <div className="flex flex-col gap-[25px]">
        <h2 className="text-[1.5rem] lg:text-[2.25rem] font-extrabold text-black">
          Statistics by service type
        </h2>
        
        <div className="flex flex-col lg:flex-row justify-between gap-[20px] lg:gap-[40px]">
          <div className="flex flex-col items-start gap-[12px]">
            <h3 className="text-[1rem] font-bold">Popular categories</h3>
             {generalData?.services && generalData.services.length > 0 ? (
                <ol className="list-decimal ml-[20px] flex flex-col gap-1">
                  {generalData.services.map((service, idx) => (
                      <li key={idx}>
                          {service.title} <span className="text-gray-400 text-sm">({service.count})</span>
                      </li>
                  ))}
                </ol>
            ) : (
                <p className="text-gray-400 italic">No orders yet</p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};