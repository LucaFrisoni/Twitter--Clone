// Verifies how the infinite scroll joins pages of the feed.
import { test } from "node:test";
import assert from "node:assert/strict";
import { mergeFeedPage } from "../lib/mergeFeedPage.ts";

const tweets = (...ids) => ids.map((_id) => ({ _id }));

// A full page means there may be more tweets to load
test("appends a full page and keeps loading", () => {
  const { items, hasMore } = mergeFeedPage(tweets("a"), tweets("b", "c"), 2);
  assert.deepEqual(items, tweets("a", "b", "c"));
  assert.equal(hasMore, true);
});

// A short page is the end of the feed, or the sentinel would keep requesting forever
test("stops loading after a short page", () => {
  const { hasMore } = mergeFeedPage(tweets("a"), tweets("b"), 2);
  assert.equal(hasMore, false);
});

// Regression: an API without cursors repeats the first page and looped the scroll
test("ignores repeated tweets and stops when a page adds nothing", () => {
  const { items, hasMore } = mergeFeedPage(tweets("a", "b"), tweets("a", "b"), 2);
  assert.deepEqual(items, tweets("a", "b"));
  assert.equal(hasMore, false);
});
