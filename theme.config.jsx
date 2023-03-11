export default {
    components: {
      h1: ({ children }) => (
        <h1 style={{
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          backgroundImage: 'linear-gradient(90deg,#7928CA,#FF0080)',
        }}
        >
          {children}
        </h1>
      )
    },
    darkMode: true,
    footer: (
      <small style={{ display: 'block', marginTop: '8rem' }}>
        <abbr
          title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
          style={{ cursor: 'help' }}
        >
          CC BY-NC 4.0
        </abbr>{' '}
        {new Date().getFullYear()} © donaldnevermore.
        <a target="_blank" href="/feed.xml">RSS</a>
        <style jsx>{`
          a {
            float: right;
            color: #0074de;
          }
          @media screen and (max-width: 480px) {
            article {
              padding-top: 2rem;
              padding-bottom: 4rem;
            }
          }
        `}</style>
      </small>
    )
}
