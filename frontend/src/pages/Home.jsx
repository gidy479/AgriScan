import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section style={{
                textAlign: 'center',
                padding: '4rem 0',
                marginBottom: '4rem'
            }}>
                <h1 className="hero-title" style={{
                    fontSize: '3.5rem',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, var(--text-main) 0%, var(--color-primary) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1.5rem',
                    lineHeight: 1.1
                }}>
                    Healthy Crops,<br />Maximum Yields
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '600px',
                    margin: '0 auto 2.5rem',
                    lineHeight: 1.6
                }}>
                    AgriScan uses advanced AI to diagnose crop diseases in seconds.
                    Upload a photo and get instant expert advice to protect your harvest.
                </p>
                <Link to="/diagnose" className="btn btn-primary" style={{ textDecoration: 'none', fontSize: '1.125rem' }}>
                    Start Diagnosis <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                </Link>
            </section>

            {/* Feature Grid */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                justifyContent: 'center'
            }}>
                <FeatureCard
                    icon={<Zap size={32} color="var(--color-primary)" />}
                    title="Instant Results"
                    description="Get accurate disease diagnosis in under 5 seconds using our optimized AI models."
                    delay="0.1s"
                />
                <FeatureCard
                    icon={<ShieldCheck size={32} color="var(--color-primary)" />}
                    title="Expert Solutions"
                    description="Receive detailed treatment plans and prevention guides curated by agronomists."
                    delay="0.2s"
                />
                <FeatureCard
                    icon={<BarChart3 size={32} color="var(--color-primary)" />}
                    title="Track History"
                    description="Monitor disease outbreaks over time and analyze trends on your farm."
                    delay="0.3s"
                />
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, delay }) => (
    <div className="animate-enter" style={{
        animationDelay: delay,
        flex: '1 1 300px', // Flex: grow, shrink, basis
        minWidth: '280px',
        maxWidth: '400px'
    }}>
        <div className="card card-hover" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '0.5rem'
        }}>
            <div style={{
                padding: '0.75rem',
                background: 'var(--color-earth-light)',
                borderRadius: 'var(--radius-md)',
                display: 'inline-flex'
            }}>
                {icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>{description}</p>
        </div>
    </div>
);

export default Home;
