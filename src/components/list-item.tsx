import { Link } from "gatsby";
import * as React from "react";

const ListItem = ({post}) => {
    const title = post.frontmatter.title || post.fields.slug

    return (
        <li>
            <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article">
                <header>
                    <h2>
                        <Link to={post.fields.slug} itemProp="url">
                            <span itemProp="headline">{title}</span>
                        </Link>
                    </h2>
                </header>
                <section>
                    <p className="date">{post.frontmatter.date}, modified: {post.frontmatter.update}</p>
                    <p className="excerpt"
                        dangerouslySetInnerHTML={{
                            __html: post.excerpt,
                        }}
                        itemProp="description"
                    />
                </section>
            </article>
        </li>
    )
}

export default ListItem
