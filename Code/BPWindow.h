//
//  BPWindow.h
//  Bunapi
//
//  Created by Yung-Luen Lan on 10/11/10.
//  Copyright 2010 HTC. All rights reserved.
//

#import <Cocoa/Cocoa.h>
#import "BPWebView.h"
#import "BPActor.h"

@interface BPWindow : NSWindow {
	BPActor *_actor;
	BPWebView *_webView;
}

@property (nonatomic, retain) BPWebView *webView;
@property (nonatomic, retain) BPActor *actor;

@end

