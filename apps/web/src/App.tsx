import { useEffect, useMemo, useState } from 'react';
import {
  Badge,
  Body1,
  Button,
  Caption1,
  Card,
  CardHeader,
  Divider,
  Field,
  Input,
  Link,
  MessageBar,
  MessageBarBody,
  Spinner,
  Subtitle1,
  Tab,
  TabList,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Text,
  Textarea,
  Title3,
  Toolbar,
  ToolbarButton,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import {
  ArrowRightRegular,
  CalendarRegular,
  CheckmarkCircleRegular,
  DocumentRegular,
  GridRegular,
  HomeRegular,
  MailRegular,
  PersonRegular,
  SearchRegular,
  SettingsRegular,
  SparkleRegular,
  TableRegular,
} from '@fluentui/react-icons';
import { api } from './api';
import { getPreviewState, setPreviewState, type PreviewDataState } from './api/previewState';
import type { Business, Campaign, Lead, User } from './api/types';

const useStyles = makeStyles({
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #f8fafc 0%, #eef8f7 100%)',
    color: tokens.colorNeutralForeground1,
    padding: '24px',
  },
  shell: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  topbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    background: 'rgba(255,255,255,0.85)',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: '18px',
    padding: '12px 18px',
  },
  navGroup: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  hero: {
    overflow: 'hidden',
    position: 'relative',
    borderRadius: '28px',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    background: 'linear-gradient(135deg, #0f766e 0%, #7c3aed 100%)',
    padding: '28px',
    color: '#fff',
    boxShadow: '0 18px 40px rgba(15, 118, 110, 0.18)',
  },
  heroMesh: {
    position: 'absolute',
    inset: 0,
    opacity: 0.25,
    pointerEvents: 'none',
    background:
      'radial-gradient(circle at top left, rgba(255,255,255,0.4), transparent 30%), radial-gradient(circle at bottom right, rgba(255,255,255,0.2), transparent 28%)',
  },
  heroContent: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
  },
  heroText: {
    maxWidth: '640px',
  },
  statGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '16px',
  },
  metricCard: {
    background: 'rgba(255,255,255,0.9)',
    borderRadius: '18px',
    padding: '18px',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '20px',
  },
  panel: {
    background: 'rgba(255,255,255,0.88)',
    borderRadius: '24px',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: '18px',
  },
  formGrid: {
    display: 'grid',
    gap: '12px',
    marginTop: '12px',
  },
  media: {
    width: '100%',
    height: '220px',
    objectFit: 'cover',
    borderRadius: '18px',
    display: 'block',
  },
  listRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  switcher: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '8px',
  },
  hidden: {
    display: 'none',
  },
});

const tabs = [
  { id: 'overview', label: 'Overview', icon: <HomeRegular /> },
  { id: 'business', label: 'Business Profile', icon: <PersonRegular /> },
  { id: 'campaigns', label: 'Campaign Drafts', icon: <SparkleRegular /> },
];

const statusAppearance: Record<string, 'outline' | 'filled' | 'tint'> = {
  'Ready for review': 'outline',
  Draft: 'filled',
  Approved: 'tint',
};

const leadAppearance: Record<string, 'outline' | 'filled' | 'tint'> = {
  New: 'outline',
  Qualified: 'filled',
  Booked: 'tint',
};

function App() {
  const styles = useStyles();
  const [business, setBusiness] = useState<Business | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewState, setPreviewStateValue] = useState<PreviewDataState>('data');

  useEffect(() => {
    const state = getPreviewState();
    setPreviewStateValue(state);
    setPreviewState(state);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const [user, profile, campaignList, leadList] = await Promise.all([
          api.getCurrentUser(),
          api.getBusiness(),
          api.listCampaigns(),
          api.listLeads(),
        ]);
        setCurrentUser(user);
        setBusiness(profile);
        setCampaigns(campaignList);
        setLeads(leadList);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [previewState]);

  const metrics = useMemo(
    () => [
      { label: 'Business', value: business?.name ?? 'Luna Spa Studio', icon: <HomeRegular /> },
      { label: 'Leads', value: `${leads.length + 39}`, icon: <SearchRegular /> },
      { label: 'Drafts', value: `${campaigns.length}`, icon: <DocumentRegular /> },
      { label: 'Status', value: 'Live', icon: <CheckmarkCircleRegular /> },
    ],
    [business, campaigns, leads],
  );

  const applyPreviewState = (state: PreviewDataState) => {
    setPreviewStateValue(state);
    setPreviewState(state);
    window.location.search = `?previewState=${state}`;
  };

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.switcher}>
          {(['data', 'loading', 'empty', 'error'] as PreviewDataState[]).map((state) => (
            <Button
              key={state}
              size="small"
              appearance={previewState === state ? 'primary' : 'secondary'}
              onClick={() => applyPreviewState(state)}
            >
              {state}
            </Button>
          ))}
        </div>

        <header className={styles.topbar}>
          <div className={styles.navGroup}>
            <Title3 as="h1">MarketFlow</Title3>
            <TabList selectedValue={activeTab} onTabSelect={(_, data) => setActiveTab(String(data.value))}>
              {tabs.map((tab) => (
                <Tab key={tab.id} value={tab.id} icon={tab.icon}>
                  {tab.label}
                </Tab>
              ))}
            </TabList>
          </div>
          <div className={styles.navGroup}>
            <Button appearance="secondary">Insights</Button>
            <Button appearance="primary">New campaign</Button>
          </div>
        </header>

        {loading ? (
          <Card>
            <div style={{ padding: '28px', display: 'grid', gap: '12px' }}>
              <Spinner label="Loading MarketFlow workspace…" />
            </div>
          </Card>
        ) : error ? (
          <MessageBar intent="error">
            <MessageBarBody>{error}</MessageBarBody>
          </MessageBar>
        ) : (
          <>
            <section className={styles.hero}>
              <div className={styles.heroMesh} />
              <div className={styles.heroContent}>
                <div className={styles.heroText}>
                  <Caption1>Marketing workspace</Caption1>
                  <Title3 as="h2" style={{ margin: '8px 0' }}>
                    Turn local customer interest into a consistent growth engine.
                  </Title3>
                  <Body1 style={{ color: 'rgba(255,255,255,0.8)' }}>
                    Review neighborhood performance, edit campaign drafts, and keep your appointment pipeline full.
                  </Body1>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                    <Button appearance="primary">Review drafts</Button>
                    <Button appearance="secondary">See analytics</Button>
                  </div>
                </div>
                <div style={{ minWidth: '240px' }}>
                  <div className={styles.metricCard}>
                    <Subtitle1>{business?.name}</Subtitle1>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                      <Text weight="semibold">Goal</Text>
                      <Text>+18% bookings</Text>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.statGrid}>
              {metrics.map((metric) => (
                <div key={metric.label} className={styles.metricCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <Text weight="semibold">{metric.label}</Text>
                    {metric.icon}
                  </div>
                  <Title3 as="h3">{metric.value}</Title3>
                </div>
              ))}
            </section>

            <section className={styles.mainGrid}>
              <div className={styles.panel}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <Subtitle1>Campaign drafts</Subtitle1>
                  <Button appearance="secondary">View all</Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderCell>Campaign</TableHeaderCell>
                      <TableHeaderCell>Channel</TableHeaderCell>
                      <TableHeaderCell>Reach</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>{campaign.name}</TableCell>
                        <TableCell>{campaign.channel}</TableCell>
                        <TableCell>{campaign.reach}</TableCell>
                        <TableCell>
                          <Badge appearance={statusAppearance[campaign.status] ?? 'outline'}>{campaign.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className={styles.panel}>
                <Subtitle1>Business profile</Subtitle1>
                <img className={styles.media} src={business?.image} alt={business?.name ?? 'Business profile'} />
                <div style={{ display: 'grid', gap: '8px', marginTop: '16px' }}>
                  <Text weight="semibold">{business?.name}</Text>
                  <Text>{business?.industry}</Text>
                  <Text>{business?.location}</Text>
                  <Text>{business?.contact}</Text>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {business?.services.map((service) => (
                      <Badge key={service} appearance="outline">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.mainGrid}>
              <div className={styles.panel}>
                <Subtitle1>Recent inquiries</Subtitle1>
                <div style={{ marginTop: '16px', display: 'grid', gap: '12px' }}>
                  {leads.map((lead) => (
                    <div key={lead.id} className={styles.listRow}>
                      <div>
                        <Text weight="semibold">{lead.customer}</Text>
                        <div>
                          <Caption1>{lead.source}</Caption1>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <Text>{lead.value}</Text>
                        <div>
                          <Badge appearance={leadAppearance[lead.status] ?? 'outline'}>{lead.status}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.panel}>
                <Subtitle1>Profile details</Subtitle1>
                <div className={styles.formGrid}>
                  <Field label="Business name">
                    <Input value={business?.name ?? ''} readOnly />
                  </Field>
                  <Field label="Services">
                    <Textarea value={business?.services.join(', ') ?? ''} readOnly />
                  </Field>
                  <Field label="Email">
                    <Input value={business?.contact ?? ''} readOnly />
                  </Field>
                  <Button appearance="primary" icon={<ArrowRightRegular />}>
                    Save changes
                  </Button>
                </div>
              </div>
            </section>

            <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 8px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <CalendarRegular />
                <Text>Campaign calendar</Text>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <MailRegular />
                <Text>{currentUser?.name ?? 'MarketFlow Team'}</Text>
              </div>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
