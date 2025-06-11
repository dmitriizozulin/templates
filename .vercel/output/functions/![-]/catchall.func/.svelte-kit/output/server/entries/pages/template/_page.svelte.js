import "clsx";
import { G as noop, D as getContext, I as ensure_array_like, J as store_get, K as attr, M as maybe_selected, E as escape_html, N as unsubscribe_stores, C as pop, z as push, O as attr_style, P as bind_props } from "../../../chunks/index.js";
import { a as readonly, d as derived, w as writable } from "../../../chunks/index3.js";
import { uniq, take, orderBy, groupBy } from "lodash";
import { T as TemplateRepositoryToken, a as createTemplate } from "../../../chunks/template.repository.js";
const now = () => Date.now();
const raf = {
  // don't access requestAnimationFrame eagerly outside method
  // this allows basic testing of user code without JSDOM
  // bunder will eval and remove ternary when the user's app is built
  tick: (
    /** @param {any} _ */
    (_) => noop()
  ),
  now: () => now(),
  tasks: /* @__PURE__ */ new Set()
};
function loop(callback) {
  let task;
  if (raf.tasks.size === 0) ;
  return {
    promise: new Promise((fulfill) => {
      raf.tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      raf.tasks.delete(task);
    }
  };
}
const tempaltesStore = writable([]);
const templateFilters = writable({});
const filters = readonly(templateFilters);
const templates = readonly(tempaltesStore);
const filteredTemplates = derived([tempaltesStore, filters], ([$tempaltesStore, $filters]) => {
  return $tempaltesStore.filter((template) => {
    const typeFilter = $filters.type ? template.type === $filters.type : true;
    const value = $filters?.value?.toLowerCase();
    const valueFilter = $filters.value ? template.value.toLowerCase().includes(value) || template.name.toLowerCase().includes(value) : true;
    return typeFilter && valueFilter;
  });
});
const updateFilters = (params) => {
  templateFilters.update((filters2) => ({
    ...filters2,
    ...params
  }));
};
const inject = ({ token, _type }) => {
  const dependency = getContext(token);
  if (!dependency) {
    throw new Error(`Implementation for dependency ${String(token)} not provided`);
  }
  return dependency;
};
const templateService = () => {
  const repository = inject(TemplateRepositoryToken);
  const use = async (templateId) => {
    const template = await repository.get(templateId);
    navigator.clipboard.writeText(template.value);
    template.use();
    await repository.save(template);
  };
  const remove = async (templateId) => {
    await repository.delete(templateId);
  };
  return {
    templates: filteredTemplates,
    filters,
    use,
    remove
  };
};
const templateCreatorService = () => {
  templateService();
  const repository = inject(TemplateRepositoryToken);
  const save = async (template) => {
    await repository.save(template);
  };
  return {
    save
  };
};
function Template_creator_view($$payload, $$props) {
  push();
  var $$store_subs;
  let isValid;
  templateCreatorService();
  const typeOptions = derived(templates, ($templates) => uniq($templates.map((it) => it.type)));
  let template = createTemplate({ name: "", type: "", value: "" });
  isValid = template.validate();
  const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$typeOptions", typeOptions));
  $$payload.out += `<div class="template svelte-1cniinl"><h2>Добавить шаблон</h2> <div class="info svelte-1cniinl"><input type="text" placeholder="Название"${attr("value", template.name)} class="svelte-1cniinl"/> <input type="text" placeholder="Категория" list="type-options"${attr("value", template.type)} class="svelte-1cniinl"/> <datalist id="type-options"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let type = each_array[$$index];
    $$payload.out += `<option${attr("value", type)}${maybe_selected($$payload, type)}></option>`;
  }
  $$payload.out += `<!--]--></datalist></div> <textarea class="template_text svelte-1cniinl" placeholder="Текст">`;
  const $$body = escape_html(template.value);
  if ($$body) {
    $$payload.out += `${$$body}`;
  }
  $$payload.out += `</textarea> <button class="template_button svelte-1cniinl"${attr("disabled", !isValid, true)}>Создать</button></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
const templateFiltersService = () => {
  templateService();
  const filter = (params) => {
    updateFilters({
      type: params.type || void 0,
      value: params.value || void 0
    });
  };
  return {
    filter
  };
};
function Template_filters_view($$payload, $$props) {
  push();
  var $$store_subs;
  const { filter } = templateFiltersService();
  let type = "";
  let value = "";
  const typeOptions = derived(templates, ($templates) => uniq($templates.map((it) => it.type)));
  {
    filter({ type, value });
  }
  const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$typeOptions", typeOptions));
  $$payload.out += `<div class="root svelte-i8t0m5"><h2>Фильтры</h2> <div class="filters svelte-i8t0m5"><input type="text" placeholder="Текст"${attr("value", value)}/> <select class="type_style svelte-i8t0m5" name="type">`;
  $$payload.select_value = type;
  $$payload.out += `<option value=""${maybe_selected($$payload, "")}>Категория</option><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let type2 = each_array[$$index];
    $$payload.out += `<option${attr("value", type2)}${maybe_selected($$payload, type2)}>${escape_html(type2)}</option>`;
  }
  $$payload.out += `<!--]-->`;
  $$payload.select_value = void 0;
  $$payload.out += `</select></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Template_import_view($$payload, $$props) {
  push();
  inject(TemplateRepositoryToken);
  $$payload.out += `<div><button class="file_style svelte-14tg6yp"><label for="file" class="svelte-14tg6yp">Загрузить из файла</label></button> <input id="file" class="file svelte-14tg6yp" type="file" accept=".json, .txt"/> <button class="file_style svelte-14tg6yp">Сохранить в файл</button></div>`;
  pop();
}
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring2 = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring2 - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map(
      (_, i) => (
        // @ts-ignore
        tick_spring(ctx, last_value[i], current_value[i], target_value[i])
      )
    );
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
function spring(value, opts = {}) {
  const store = writable(value);
  const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
  let last_time;
  let task;
  let current_token;
  let last_value = (
    /** @type {T} */
    value
  );
  let target_value = (
    /** @type {T | undefined} */
    value
  );
  let inv_mass = 1;
  let inv_mass_recovery_rate = 0;
  let cancel_task = false;
  function set(new_value, opts2 = {}) {
    target_value = new_value;
    const token = current_token = {};
    if (value == null || opts2.hard || spring2.stiffness >= 1 && spring2.damping >= 1) {
      cancel_task = true;
      last_time = raf.now();
      last_value = new_value;
      store.set(value = target_value);
      return Promise.resolve();
    } else if (opts2.soft) {
      const rate = opts2.soft === true ? 0.5 : +opts2.soft;
      inv_mass_recovery_rate = 1 / (rate * 60);
      inv_mass = 0;
    }
    if (!task) {
      last_time = raf.now();
      cancel_task = false;
      task = loop((now2) => {
        if (cancel_task) {
          cancel_task = false;
          task = null;
          return false;
        }
        inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
        const elapsed = Math.min(now2 - last_time, 1e3 / 30);
        const ctx = {
          inv_mass,
          opts: spring2,
          settled: true,
          dt: elapsed * 60 / 1e3
        };
        const next_value = tick_spring(ctx, last_value, value, target_value);
        last_time = now2;
        last_value = /** @type {T} */
        value;
        store.set(value = /** @type {T} */
        next_value);
        if (ctx.settled) {
          task = null;
        }
        return !ctx.settled;
      });
    }
    return new Promise((fulfil) => {
      task.promise.then(() => {
        if (token === current_token) fulfil();
      });
    });
  }
  const spring2 = {
    set,
    update: (fn, opts2) => set(fn(
      /** @type {T} */
      target_value,
      /** @type {T} */
      value
    ), opts2),
    subscribe: store.subscribe,
    stiffness,
    damping,
    precision
  };
  return spring2;
}
function Template_view($$payload, $$props) {
  push();
  var $$store_subs;
  let template = $$props["template"];
  let size = spring(100);
  templateService();
  $$payload.out += `<div class="template svelte-1vkbl3m"${attr_style(`scale: ${store_get($$store_subs ??= {}, "$size", size) / 100}`)}><h4 class="name svelte-1vkbl3m">${escape_html(template.name)}</h4> <p class="value svelte-1vkbl3m">${escape_html(template.value)}</p> <div class="btn_wrapper svelte-1vkbl3m"><button class="btn svelte-1vkbl3m">Удалить</button></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { template });
  pop();
}
function Template_top_view($$payload, $$props) {
  push();
  var $$store_subs;
  templateService();
  const topTemplates = derived(templates, ($templates) => {
    return take(orderBy($templates, "usedCount", "desc"), 10);
  });
  const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$topTemplates", topTemplates));
  $$payload.out += `<div class="templates svelte-1w3k36y"><h2 class="templates_style svelte-1w3k36y">Часто используемые</h2> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let template = each_array[$$index];
    $$payload.out += `<div>`;
    Template_view($$payload, { template });
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Template_1($$payload, $$props) {
  push();
  var $$store_subs;
  const { templates: templates2 } = templateService();
  const orderedByCreation = derived(templates2, ($templates) => orderBy($templates, "createdAt", "asc"));
  const groupedByType = derived(orderedByCreation, ($orderedByCreation) => groupBy($orderedByCreation, "type"));
  const each_array = ensure_array_like(Object.entries(store_get($$store_subs ??= {}, "$groupedByType", groupedByType)));
  $$payload.out += `<div class="root svelte-1ss6xgj"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let [type, templates3] = each_array[$$index_1];
    const each_array_1 = ensure_array_like(templates3);
    $$payload.out += `<h3 class="type svelte-1ss6xgj">${escape_html(type)}</h3> <div class="templates svelte-1ss6xgj"><!--[-->`;
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let template = each_array_1[$$index];
      $$payload.out += `<div>`;
      Template_view($$payload, { template });
      $$payload.out += `<!----></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function _page($$payload) {
  $$payload.out += `<section class="root svelte-chui9g"><main class="templates svelte-chui9g"><header class="header svelte-chui9g">`;
  Template_creator_view($$payload);
  $$payload.out += `<!----> `;
  Template_import_view($$payload);
  $$payload.out += `<!----></header> `;
  Template_filters_view($$payload);
  $$payload.out += `<!----> `;
  Template_1($$payload);
  $$payload.out += `<!----></main> <aside class="top svelte-chui9g">`;
  Template_top_view($$payload);
  $$payload.out += `<!----></aside></section>`;
}
export {
  _page as default
};
