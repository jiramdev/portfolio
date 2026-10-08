import assert from "node:assert/strict";
import { test } from "node:test";
import {
  getProjectBySlug,
  getProjects,
  getPublishedProjects,
  projects,
} from "./projects.ts";

test("project order drives the grid", () => {
  const orders = projects.map((p) => p.order);
  assert.deepEqual(
    orders,
    [...orders].sort((a, b) => a - b),
    "order must be ascending"
  );
  assert.equal(new Set(orders).size, orders.length, "duplicate order");
  assert.equal(
    new Set(projects.map((p) => p.slug)).size,
    projects.length,
    "duplicate slug"
  );
});

test("coming soon projects appear in the grid but have no page", async () => {
  const soon = projects.filter((p) => p.comingSoon);

  assert.ok(soon.length > 0, "no coming soon projects");
  assert.equal((await getProjects()).length, projects.length);
  assert.equal((await getPublishedProjects()).length, projects.length - soon.length);

  for (const project of soon) {
    assert.equal(
      await getProjectBySlug(project.slug),
      null,
      `${project.slug} must 404`
    );
  }
});

test("every image carries alt text, every video a poster", () => {
  for (const project of projects) {
    assert.ok(project.cover.alt.trim(), `${project.slug}: cover alt`);
    if (project.cover.type === "video") {
      assert.ok(project.cover.poster, `${project.slug}: cover poster`);
    }

    for (const item of project.gallery) {
      assert.ok(item.alt.trim(), `${project.slug}: ${item.url} alt`);
      if (/\.(mp4|webm|mov)(\?|$)/i.test(item.url)) {
        assert.ok(item.poster, `${project.slug}: ${item.url} poster`);
      }
    }
  }
});