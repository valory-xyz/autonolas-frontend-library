import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export const DefaultDisclaimerText = () => (
  <Typography>
    <Title style={{ textAlign: 'center' }}>Disclaimer</Title>
    <Paragraph>
      This App is for our community to encourage Safe ecosystem contributors and
      users to unlock SafeDAO governance.
    </Paragraph>
    <Paragraph>
      THIS APP IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; AT
      YOUR OWN RISK. AND WITHOUT WARRANTIES OF ANY KIND. We will not be liable
      for any loss, whether such loss is direct, indirect, special or
      consequential, suffered by any party as a result of their use of this app.
    </Paragraph>
    <Paragraph>
      By accessing this app, you represent and warrant
      <ul>
        <li>
          that you are of legal age and that you will comply with any laws
          applicable to you and not engage in any illegal activities;
        </li>
        <li>
          that you are claiming Safe tokens to participate in the SafeDAO
          governance process and that they do not represent consideration for
          past or future services;
        </li>
        <li>
          that you, the country you are a resident of and your wallet address is
          not on any sanctions lists maintained by the United Nations,
          Switzerland, the EU. UK or the US;
        </li>
        <li>
          that you are responsible for any tax obligations arising out of the
          interaction with this app.
        </li>
      </ul>
    </Paragraph>
    <Paragraph>
      None of the information available on this app, or made otherwise available
      to you in relation to its use, constitutes any legal, tax, financial or
      other advice. Where in doubt as to the action you should take, please
      consult your own legal, financial, tax or other professional advisors.
    </Paragraph>
  </Typography>
);
