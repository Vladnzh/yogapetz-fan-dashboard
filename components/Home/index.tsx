'use client';
import { SettingsPopup } from '@/components/Home/SettingsPopup';
import { EthPriceBlock } from '@/components/Home/EthPriceBlock';
import { SummaryBlock } from '@/components/Home/SummaryBlock';
import { InputWallet } from '@/components/Home/InputWallet';
import { SelectPage } from '@/components/Home/SelectPage';
import { Table } from '@/components/Home/Table';

export const Home = () => {
   return (
      <div>
         <SettingsPopup />
         <div className="home">
            <EthPriceBlock />
            <SummaryBlock />
            <InputWallet />
            <SelectPage />
            <Table />
         </div>
      </div>
   );
};
