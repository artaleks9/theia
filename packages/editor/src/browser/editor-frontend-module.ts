/*
 * Copyright (C) 2018 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ContainerModule } from 'inversify';
import { CommandContribution, MenuContribution, bindContributionProvider } from "@theia/core/lib/common";
import {
    OpenHandler, WidgetFactory, FrontendApplicationContribution,
    KeybindingContribution, KeybindingContext, LabelProviderContribution
} from '@theia/core/lib/browser';
import { EditorManager } from './editor-manager';
import { EditorContribution } from './editor-contribution';
import { EditorMenuContribution } from './editor-menu';
import { EditorCommandContribution } from './editor-command';
import { EditorKeybindingContribution, EditorKeybindingContext } from "./editor-keybinding";
import { bindEditorPreferences } from './editor-preferences';
import { DiffUriLabelProviderContribution } from './diff-uris';
import { EditorDecorationsService, EditorDecorationTypeProvider } from './editor-decorations-service';
import { EditorWidgetFactory } from './editor-widget-factory';

export default new ContainerModule(bind => {
    bindEditorPreferences(bind);

    bind(WidgetFactory).to(EditorWidgetFactory).inSingletonScope();

    bind(EditorManager).toSelf().inSingletonScope();
    bind(OpenHandler).toService(EditorManager);

    bind(CommandContribution).to(EditorCommandContribution).inSingletonScope();
    bind(MenuContribution).to(EditorMenuContribution).inSingletonScope();

    bind(EditorKeybindingContext).toSelf().inSingletonScope();
    bind(KeybindingContext).toService(EditorKeybindingContext);

    bind(KeybindingContribution).to(EditorKeybindingContribution).inSingletonScope();

    bind(EditorContribution).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toService(EditorContribution);

    bind(LabelProviderContribution).to(DiffUriLabelProviderContribution).inSingletonScope();

    bindContributionProvider(bind, EditorDecorationTypeProvider);
    bind(EditorDecorationsService).toSelf().inSingletonScope();
});
