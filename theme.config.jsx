export default {
    footer: (
        <small style={{ display: 'block', marginTop: '8rem' }}>
          <abbr
            title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
            style={{ cursor: 'help' }}
          >
            CC BY-NC 4.0
          </abbr>{' '}
          <time dateTime={new Date().toISOString()}>
            {new Date().getFullYear()}
          </time>{' '}
          © donaldnevermore.
          <a href="/feed.xml">RSS</a>
          <style jsx>{`
            a {
              float: right;
            }
            @media screen and (max-width: 480px) {
              article {
                padding-top: 2rem;
                padding-bottom: 4rem;
              }
            }
          `}</style>
        </small>
      ),
      head: ({ title, meta }) => (
        <>
          {meta.description && (
            <meta name="description" content={meta.description} />
          )}
          {meta.tag && <meta name="keywords" content={meta.tag} />}
          {meta.author && <meta name="author" content={meta.author} />}
        </>
      ),
      readMore: 'Read More →',
      postFooter: <a href="https://github.com/donaldnevermore/donaldnevermore.github.io/issues"
      target="_blank">
      Reply to this post on GitHub
      </a>,
      darkMode: true
  }
